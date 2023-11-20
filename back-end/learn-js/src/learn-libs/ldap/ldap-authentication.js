const { authenticate } = require('ldap-authentication');
// https://www.npmjs.com/package/ldap-authentication
async function auth() {
  // await getAdmin();
  await getUser();
}

async function getUser() {
  // auth with regular user
  // const options2 = {
  //   ldapOpts: {
  //     url: 'ldap://ldap.forumsys.com',
  //     connectTimeout: 10000,
  //     // tlsOptions: { rejectUnauthorized: false }
  //   },
  //   userDn: 'uid=einstein,dc=example,dc=com',
  //   userPassword: 'password',
  //   usernameAttribute: 'uid',
  //   username: 'einstein',
  //   userSearchBase: 'dc=example,dc=com',
  //   // userSearchBase: 'ou=scientists,dc=example,dc=com',
  //   // starttls: false
  // };
  const options2 = {
    ldapOpts: {
      url: 'ldap://ldap.jumpcloud.com:389',
      connectTimeout: 10000,
      // tlsOptions: { rejectUnauthorized: false }
    },
    userDn: 'uid=haind1,ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com',
    userPassword: '!Hai1234567890',
    usernameAttribute: 'uid',
    username: 'haind1',
    userSearchBase: 'o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com',
    // starttls: false
  };

  const user2 = await authenticate(options2);
  console.log({ user2 });
}
async function getAdmin() {
  // auth with admin
  const options = {
    ldapOpts: {
      url: 'ldap://ldap.forumsys.com',
      connectTimeout: 10000,
      // tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: 'cn=read-only-admin,dc=example,dc=com',
    adminPassword: 'password',
    userSearchBase: 'ou=scientists,dc=example,dc=com',
    usernameAttribute: 'uid',
    // groupsSearchBase: 'ou=scientists,dc=example,dc=com',
    // starttls: false
  };

  const user = await authenticate(options);
  console.log({ admin: user });
}

auth();
