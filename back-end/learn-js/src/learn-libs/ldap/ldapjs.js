const ldap = require('ldapjs');

// ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
/**
 * https://jumpcloud.com/support/use-ldapsearch-with-jumpcloud
 * ldapsearch
 * -H ldaps://ldap.jumpcloud.com:636
 * -x
 * -b "ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com"
 * -D "uid=haind1,ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com"
 * -W "(objectClass=inetOrgPerson)"
 *
 * ldapsearch -H ldaps://ldap.jumpcloud.com:636 -x -b "ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com" -D "uid=haind1,ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com" -W "(objectClass=*)"
 */

function func1() {
  const client = ldap.createClient({
    url: 'ldap://ldap.forumsys.com/uid=einstein,dc=example,dc=com',
  });

  const opts = {
    filter: '(objectclass=user)',
    scope: 'sub',
    attributes: ['objectGUID'],
  };

  client.bind('einstein', 'password', function (err) {
    client.search('dc=example,dc=com', opts, function (err, search) {
      search.on('searchEntry', function (entry) {
        const user = entry.object;
        console.log(user.objectGUID);
      });
    });
  });
}

function func1() {
  const client = ldap.createClient({
    url: 'ldap://ldap.forumsys.com',
  });

  const opts = {
    filter: '(objectclass=user)',
    scope: 'sub',
    attributes: ['objectGUID'],
  };

  const baseDn = 'dc=example,dc=com';
  const userDn = `uid=einstein,${baseDn}`;
  const password = 'password';

  client.bind(userDn, password, (err) => {
    console.log('🚀 err1:', err);

    client.search(baseDn, opts, (err, res) => {
      console.log('🚀 err2:', err);

      res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
      });
      res.on('searchEntry', (entry) => {
        console.log('entry: ' + entry);
        // console.log('entry: ' + JSON.stringify(entry.pojo));
      });
      res.on('searchReference', (referral) => {
        console.log('referral: ' + referral?.uris?.join());
      });
      res.on('error', (err) => {
        console.error('error: ' + err?.message);
      });
      res.on('end', (result) => {
        console.log('status: ' + result.status);
      });
    });
  });

  client.on('connectError', (err) => {
    console.log('🚀connectError:', err);
    // handle connection error
  });
}

function func2() {
  const client = ldap.createClient({
    url: 'ldap://ldap.jumpcloud.com:389',
  });

  const opts = {
    // filter: '(objectClass=*)',
    filter: 'objectClass=inetOrgPerson',
    scope: 'sub',
    // attributes: ['objectGUID'],
  };

  const baseDn = 'ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com';
  const userDn = `uid=haind1,${baseDn}`;
  const password = '!Hai1234567890';

  client.bind(userDn, password, (err) => {
    console.log('🚀 err1:', err);

    client.search(baseDn, opts, (err, res) => {
      console.log('🚀 err2:', err);

      res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
      });
      res.on('searchEntry', (entry) => {
        console.log('entry: ' + entry);
        // console.log('entry: ' + JSON.stringify(entry.pojo));
      });
      res.on('searchReference', (referral) => {
        console.log('referral: ' + referral?.uris?.join());
      });
      res.on('error', (err) => {
        console.error('error: ' + err?.message);
      });
      res.on('end', (result) => {
        console.log('status: ' + result.status);
      });
    });
  });

  client.on('connectError', (err) => {
    console.log('🚀connectError:', err);
    // handle connection error
  });
}

func2();
