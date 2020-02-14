import { Model } from 'radiks-gavin-test';

export default class Message extends Model {
  static className = 'Message';

  static schema = {
    from: String,
    content: String,
    flag: {
      type: Boolean,
      decrypted: true
    },
    /*
    userGroupId: {
      type: String,
      decrypted: true,
    }
    */
  }

  static defaults = {
    content: "welcome to message board",
    //userGroupId:"4b24a0d0fcdf-40a2-a735-a3e0cbd4a002"
  }
}
