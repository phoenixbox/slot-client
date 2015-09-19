/*eslint-env node */
export const RAILSRoot = process.env.NODE_ENV === 'production' ? 'https://coffeeslots-server.herokuapp.com': 'http://127.0.0.1:4000';
export const HAPIRoot = process.env.NODE_ENV === 'production' ? 'https://coffeeslots.herokuapp.com': 'http://127.0.0.1:3800';
