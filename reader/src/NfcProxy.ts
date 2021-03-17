import { Platform } from 'react-native';
import NfcManager, {
  NfcTech,
  Ndef,
  NfcEvents,
  TagEvent,
} from 'react-native-nfc-manager';

import { Actions } from './AppContext';

class ErrSuccess extends Error {}

const withAndroidPrompt = <T extends Array<any>, U>(fn: (...args: T) => U) => {
  async function wrapper(...args: T) {
    try {
      if (Platform.OS === 'android') {
        console.log('in here');
        Actions.setShowNfcPrompt!(true);
      }

      return await fn(...args);
    } catch (ex) {
      throw ex;
    } finally {
      if (Platform.OS === 'android') {
        Actions.setShowNfcPrompt!(false);
      }
    }
  }

  return wrapper;
};

class NfcProxy {
  constructor() {
    NfcManager.start();
  }

  readNdefOnce = withAndroidPrompt(() => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise<TagEvent | null>((resolve) => {
      let tagFound: TagEvent | null = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
        tagFound = tag;
        resolve(tagFound);

        if (Platform.OS === 'ios') {
          NfcManager.setAlertMessageIOS('NDEF tag found');
        }

        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve(null);
        }
      });

      NfcManager.registerTagEvent();
    });
  });

  readTag = withAndroidPrompt(async () => {
    let tag = null;
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      //tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
    } catch (ex) {
      console.warn(ex);
    }

    NfcManager.cancelTechnologyRequest().catch(() => 0);
    return tag;
  });

  /*
  public static NdefMessage getPlaceidAsNdef(Long id) {
    String msg = ((Long) id).toString();
    byte[] textBytes = msg.getBytes();
    NdefRecord textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA,
        "application/vnd.facebook.places".getBytes(), new byte[] {}, textBytes);
    return new NdefMessage(new NdefRecord[] { textRecord });
}
*/

  writeNdefMime = withAndroidPrompt(async () => {
    let result = false;
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NDEF',
      });

      // const foo: NdefRecord = {
      //   tnf: Ndef.TNF_MIME_MEDIA,
      //   type: Ndef.RTD_TEXT,
      //   payload:
      // };

      // console.log(value);

      const mime = Ndef.record(
        Ndef.TNF_MIME_MEDIA,
        'application/ontick',
        [],
        'foo bar',
      );
      const bytes = Ndef.encodeMessage([mime]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Successfully write NDEF');
        }
      }

      result = true;
    } catch (ex) {
      console.warn(ex);
    }

    NfcManager.cancelTechnologyRequest().catch(() => 0);
    return result;
  });

  writeNdef = withAndroidPrompt(
    async ({ type, value }: { type: string; value: any }) => {
      let result = false;
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef, {
          alertMessage: 'Ready to write some NDEF',
        });

        let bytes = null;
        if (type === 'TEXT') {
          console.warn(type, value);
          bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
        } else if (type === 'URI') {
          bytes = Ndef.encodeMessage([Ndef.uriRecord(value)]);
        } else if (type === 'WIFI_SIMPLE') {
          bytes = Ndef.encodeMessage([Ndef.wifiSimpleRecord(value)]);
        }

        if (bytes) {
          await NfcManager.ndefHandler.writeNdefMessage(bytes);

          if (Platform.OS === 'ios') {
            await NfcManager.setAlertMessageIOS('Successfully write NDEF');
          }
        }

        result = true;
      } catch (ex) {
        console.warn(ex);
      }

      NfcManager.cancelTechnologyRequest().catch(() => 0);
      return result;
    },
  );

  customTransceiveNfcA = withAndroidPrompt(async (commands: any) => {
    const responses = [];

    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      for (const { type, payload } of commands) {
        let resp = null;
        if (type === 'command') {
          resp = await NfcManager.nfcAHandler.transceive(payload);
        } else if (type === 'delay') {
          await delay(payload);
        }
        responses.push(resp);
      }
    } catch (ex) {
      console.warn(ex);
    }

    NfcManager.cancelTechnologyRequest().catch(() => 0);

    return responses;
  });

  eraseNfcA = withAndroidPrompt(async ({ format = false } = {}) => {
    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      //const cmdReadCC = [0x30, 0x03];
      // const [e1, ver, size, access] = await NfcManager.nfcAHandler.transceive(
      //   cmdReadCC,
      // );
      const size = 1;

      const blocks = (size * 8) / 4;

      for (let i = 0; i < blocks; i++) {
        const blockNo = i + 0x04; // user block starts from 0x04
        const cmdWriteZero = [0xa2, blockNo, 0x0, 0x0, 0x0, 0x0];
        await NfcManager.nfcAHandler.transceive(cmdWriteZero);
      }

      if (format) {
        const cmdNdefFormat = [0xa2, 0x04, 0x03, 0x00, 0xfe, 0x00];
        await NfcManager.nfcAHandler.transceive(cmdNdefFormat);
      }
    } catch (ex) {
      console.warn(ex);
    }

    NfcManager.cancelTechnologyRequest().catch(() => 0);
  });
}

// ------------------------
//  Utils
// ------------------------
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default new NfcProxy();
export { ErrSuccess };
