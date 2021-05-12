import { Message, SymbolData } from './connectMT4.types';

export const connectMT4 = () => {
  let ws: WebSocket;
  let ssid: string;

  const connect = async () => {
    // const url = 'wss://ws.xapi.pro/demo';
    // const url = 'wss://ws.xapi.pro/demoStream';
    // const url = 'wss://ws.xapi.pro/realStream';
    // const url = 'wss://ws.xtb.com/realStream';
    // const url = 'wss://ws.xtb.com/demoStream';
    const url = 'wss://ws.xtb.com/demo';
    console.log('Connecting to: ' + url);

    ws = new WebSocket(url);
    // console.log('ws:', ws);

    ws.onerror = (event) => {
      console.error(event);
    };

    ws.onopen = () => {
      console.log('Connected');
      login();
    };

    ws.onmessage = async (evt) => {
      try {
        const response = await JSON.parse(evt.data);
        const { status, streamSessionId, errorDescr } = response;

        console.log('onMessageResponse:', response);

        if (!status) {
          alert('Error: \n' + errorDescr);
        }

        if (streamSessionId) {
          // We received login response
          ssid = streamSessionId;
          getCurrentUserData();
          getSymbol();
        }
      } catch (Exception) {
        alert(`Fatal error while receiving data! :(\n${Exception.message}`);
      }
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };

    return ssid;
  };

  const login = () => {
    const msg: Message = {
      command: 'login',
      arguments: {
        userId: '12230119',
        password: 'xoh35655',
        // userId: '21769',
        // password: 'sp6stfXT',
      },
    };
    // console.log('Trying to log in as: ' + msg.arguments?.userId);
    send(msg);
  };

  const disconnect = () => {
    ws.close();
  };

  const send = (jsonMessage: Message) => {
    console.log('msg:', jsonMessage);
    try {
      const msg = JSON.stringify(jsonMessage);
      ws.send(msg);
      // console.log('Sent ' + msg.length + ' bytes of data: ' + msg);
    } catch (Exception) {
      console.error(`Error while sending data: \n${Exception.message}`);
    }
  };

  const getAllSymbols = () => {
    const msg = {
      command: 'getAllSymbols',
    };
    console.log('Getting list of symbols');
    send(msg);
  };

  const parseGetAllSymbols = (returnData: SymbolData[]) => {
    // For all symbols
    console.log('returnData:', returnData);
    const rows = returnData.map((item) => {
      return {
        symbol: item.symbol,
        ask: item.ask,
        bid: item.bid,
        description: item.description,
      };
    });
    console.log('rows:', rows);
  };

  const getBalance = () => {
    const msg = {
      command: 'getBalance',
      streamSessionId: ssid || '',
    };
    console.log('Getting balance');
    send(msg);
  };

  const getCurrentUserData = () => {
    const msg = {
      command: 'getCurrentUserData',
    };
    console.log('Getting current user data');
    send(msg);
  };

  const getSymbol = () => {
    const msg = {
      command: 'getSymbol',
      arguments: {
        symbol: 'DE30',
      },
    };
    console.log('Getting current user data');
    send(msg);
  };

  return { connect, disconnect, getBalance };
};
