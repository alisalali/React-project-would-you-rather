const RECEIVE_QUOTE = "RECEIVE_QUOTE";

export default function receiveQuote(quotes) {
  return {
    type: RECEIVE_QUOTE,
    quotes,
  };
}
