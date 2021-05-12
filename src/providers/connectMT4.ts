import { Message, SymbolData } from './connectMT4.types';

export const connectMT4 = () => {
  let ws: WebSocket;

  const connect = () => {
    const url = 'wss://ws.xapi.pro/demo';
    // const url = 'wss://ws.xapi.pro/demoStream';
    // const url = 'wss://ws.xtb.com/realStream';
    // const url = 'wss://ws.xapi.pro/realStream';
    console.log('Connecting to: ' + url);

    ws = new WebSocket(url);
    console.log('ws:', ws);

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

        if (response.status) {
          if (response.streamSessionId !== undefined) {
            // We received login response
            getAllSymbols();
          } else {
            // We received getAllSymbols response
            parseGetAllSymbols(response.returnData);
          }
        } else {
          alert('Error: \n' + response.errorDescr);
        }
      } catch (Exception) {
        alert('Fatal error while receiving data! :(');
      }
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };
  };

  const disconnect = () => {
    ws.close();
  };

  const send = (jsonMessage: Message) => {
    try {
      const msg = JSON.stringify(jsonMessage);
      ws.send(msg);
      console.log('Sent ' + msg.length + ' bytes of data: ' + msg);
    } catch (Exception) {
      console.error('Error while sending data: ' + Exception.message);
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
    console.log('Trying to log in as: ' + msg.arguments?.userId);
    send(msg);
  };

  return { connect, disconnect };
};
