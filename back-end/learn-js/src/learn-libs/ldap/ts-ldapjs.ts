import ldap, { SearchOptions, Client } from 'ldapjs';

// ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
/**
 * REFS:
 * https://console.jumpcloud.com/#/users
 * http://ldapjs.org/client.html#search
 *
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

const list: any[] = [];

function logEntry(entry: any) {
  // console.log('entry: ' + JSON.stringify(entry.pojo));
  const { messageId, protocolOp, type, ...item } = entry?.pojo || entry || {};
  list.push(item);
  // console.log("🚀 messageId, protocolOp, type:", messageId, protocolOp, type)
  console.log('🚀 ~ item:', JSON.stringify(item || {}));
}

async function onDone(result: any, client: Client | null = null) {
  const { status, matchedDN, diagnosticMessage, referrals, ...res } = result || {};
  console.log('🚀 ~ result:', { status, matchedDN, diagnosticMessage, referrals });
  // console.log('🚀 ~ result2:', res);
  console.log(
    '🚀 list:',
    list.length,
    // JSON.stringify(list)
  );
  client?.unbind(console.error);
  process.exit(0);
}

function func1() {
  const client = ldap.createClient({
    url: 'ldap://ldap.forumsys.com',
  });

  const opts: SearchOptions = {
    // filter: '(objectClass=inetOrgPerson)',
    filter: '(&(objectClass=inetOrgPerson)(!(cn=read-only-admin))',
    scope: 'sub',
    attributes: ['objectGUID'],
    sizeLimit: 300,
    paged: {
      pageSize: 3,
      // pagePause: true
    },
  };

  const baseDn = 'dc=example,dc=com';
  const userDn = `uid=einstein,${baseDn}`;
  const password = 'password';

  client.bind(userDn, password, (err: any) => {
    console.log('🚀 err1:', err);

    client.search(baseDn, opts, (err: any, res) => {
      console.log('🚀 err2:', err);

      res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
      });
      res.on('searchEntry', (entry) => {
        logEntry(entry);
      });
      res.on('page', (result, cb) => {
        // console.log("🚀 ~ file: ldapjs.js:75 ~ res.on ~ cb:", cb)
        // console.log("🚀 ~ file: ldapjs.js:75 ~ res.on ~ result:", result)
        // Allow the queue to flush before fetching next page
        // queue.cbWhenFlushed(cb);
        console.log('done one page:');
      });
      res.on('searchReference', (referral) => {
        console.log('referral: ' + referral?.uris?.join());
      });
      res.on('error', (err) => {
        console.error('error: ' + err?.message);
      });
      res.on('end', (result) => {
        // console.log('status: ' + result);
        onDone(result, client);
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

  const opts: SearchOptions = {
    // filter: '(objectClass=*)',
    filter: '(objectClass=inetOrgPerson)',
    scope: 'sub',
    // attributes: ['objectGUID'],
  };

  const baseDn = 'ou=Users,o=655ac719379db736a9574bc3,dc=jumpcloud,dc=com';
  const userDn = `uid=haind1,${baseDn}`;
  const password = '!Hai1234567890';

  client.bind(userDn, password, (err: any) => {
    console.log('🚀 err1:', err);

    client.search(baseDn, opts, (err: any, res) => {
      console.log('🚀 err2:', err);

      res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
      });
      res.on('searchEntry', (entry) => {
        logEntry(entry);
      });
      res.on('searchReference', (referral) => {
        console.log('referral: ' + referral?.uris?.join());
      });
      res.on('error', (err) => {
        console.error('error: ' + err?.message);
      });
      res.on('end', (result) => {
        // console.log('status: ' + result);
        onDone(result, client);
      });
    });
  });

  client.on('connectError', (err) => {
    console.log('🚀connectError:', err);
    // handle connection error
  });
}

func1();
