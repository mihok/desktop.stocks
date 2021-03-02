// const DEFAULT_API_KEY = 'CM5SV29NE06A8T2W';
// const DEFAULT_OPTIONS = {
//   method: 'GET',
// };


export interface IntradayDatum {
  [ key: string ]: string
}


export class AlphaVantageService {
  private async fetchIntraday(symbol: string, options: {} = {}) {
    // const params = [
    //   `function=TIME_SERIES_INTRADAY_EXTENDED`,
    //   `symbol=${symbol}`,
    //   `interval=5min`,
    //   `slice=year1month1`,
    //   `apikey=${DEFAULT_API_KEY}`,
    // ];

    // const url = `https://www.alphavantage.co/query?${params.join('&')}`;
    // const response = await fetch(url, Object.assign({}, DEFAULT_OPTIONS, options));
    
    // return response.text();
    const data = `time,open,high,low,close,volume
2021-01-21 20:00:00,12.55,12.59,12.54,12.59,25950
2021-01-21 19:55:00,12.51,12.55,12.5,12.54,24979
2021-01-21 19:50:00,12.57,12.64,12.51,12.55,937
2021-01-21 19:45:00,12.62,12.62,12.49,12.49,20942
2021-01-21 19:40:00,12.68,12.68,12.6,12.6,5178
2021-01-21 19:35:00,12.6,12.65,12.6,12.65,7692
2021-01-21 19:30:00,12.6,12.65,12.6,12.64,5296
2021-01-21 19:25:00,12.55,12.62,12.55,12.62,15378
2021-01-21 19:20:00,12.62,12.62,12.55,12.6,14481`;

    return await this.parseIntraday(data);
  }

  private async parseIntraday(data: string): Promise<Array<IntradayDatum>> {
    const lines                         = data.split('\n');
    const result: Array<IntradayDatum>  = [];
    const headers                       = (lines.shift() as string).split(','); // Get the columns

    console.log('LINES', lines);
    console.log('HEADERS', headers);
    if (headers.length) {
      for (const line of lines) {
        const datum: IntradayDatum = {}
        const columns: Array<string> = line.split(',');

        for (const [ index, column ] of columns.entries()) {
          datum[headers[index]] = column as string;
        }

        result.push(datum);
      }
    }

    return result;
  }

  async getIntradayBySymbol (symbol: string) {
    const data = await this.fetchIntraday(symbol);

    console.log('DATA', data);

    return data;
  }
}

export default new AlphaVantageService();
