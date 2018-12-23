// bc lint runs from top-level package.json, which does not have this dep to allow travis to build
// eslint-disable-next-line import/no-unresolved
const argon2 = require('argon2');
// see https://github.com/ranisalt/node-argon2/blob/master/argon2.d.ts

const argonOptions = {
  hashLength: 65,
  timeCost: 3,
  memoryCost: 4096,
  parallelism: 1,
  type: 0,
  //    version?: number;
  salt: Buffer.from('pancetta meatball, salami pig tail flank bresaola brisket biltong', 'utf8'),
  //    saltLength?: number;
  raw: false,
};

async function hash(text) {
  try {
    const hashed = await argon2.hash(text, argonOptions);

    return hashed;
  } catch (err) {
    console.error('failed hashing', err);
    return null;
  }
}


module.exports.hash = hash;
