import { upgradeBase64crypto } from '../../../utils/pwCrypto';
import { generateToken } from '../../passport';
const crypto = require('crypto');

export default {
  Mutation: {
    user: async (_, args, { request, query }) => {
      try {
        const param = args.param;
        let pwHash = await crypto
          .createHash('sha512')
          .update(param.id + param.pw + process.env.KEY)
          .digest('hex');
        const result = await query('user', 'login', {
          id: param.id,
          pw: pwHash
        });
        if (!result[0]) {
          return { id: '', name: '', token: '' };
        } else {
          const token = generateToken(result[0].id);
          return { id: result[0].id, name: result[0].name, token: token };
        }
      } catch (err) {}
    }
  },
  Query: {
    userInfo: async (_, args, { request, query }) => {
      try {
        const result = await query('user', 'userInfo', { id: request.user.id });
        if (!result[0]) {
          return null;
        } else {
          return result;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
