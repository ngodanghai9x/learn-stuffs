const ldap = require('ldapjs');

// ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
/**
 * https://jumpcloud.com/support/use-ldapsearch-with-jumpcloud
 * ldapsearch -H ldaps://ldap.jumpcloud.com:636 -x -b "ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com" -D "uid=haind1,ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com" -W "(objectClass=inetOrgPerson)"
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

function func2() {
  const client = ldap.createClient({
    url: 'ldap://ldap.jumpcloud.com:389',
  });
  
  const opts = {
    filter: '',
    scope: 'sub',
    // attributes: ['objectGUID'],
  };
  
  client.bind('einstein', 'password', function (err) {
    client.search('dc=example,dc=com', opts, function (err, search) {
    console.log("🚀 ~ file: ldapjs.js:44 ~ search:", search)
    search.on('searchEntry', function (entry) {
        const user = entry.object;
        console.log(user.objectGUID);
      });
    });
  });
}
