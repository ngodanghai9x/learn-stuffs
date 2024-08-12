import { nodeProfilingIntegration } from '@sentry/profiling-node';
// import Sentry from '@sentry/node';
import * as Sentry from '@sentry/node';

// const Sentry = require('@sentry/node');

Sentry.init({
    dsn: 'https://ddbb2ed544e2c5595aa95993cdc0b9cf@o4507764363689984.ingest.de.sentry.io/4507764379680848',
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,

    environment: process.env.NODE_ENV || 'dev',
    release: process.env.COMMIT_HASH || null,

    // serverName: serviceName,

    // Advanced, optional: Called for message and error events
    beforeSend(event) {
        return event;
    },

    // Advanced, optional: Called for transaction events, you can further debug your transactions here
    beforeSendTransaction(event) {
        return event;
    },
    integrations: [
        nodeProfilingIntegration(),
        // Sentry.httpIntegration({}),
        // Sentry.postgresIntegration(),
        // Sentry.expressIntegration(),
        // Sentry.redisIntegration(),
        // Sentry.nestIntegration(),
        // Sentry.connectIntegration(),
        //
    ],
    ignoreErrors: ['UnauthorizedException', 'UnauthorizedException', 'NotFoundException'],
});

function run() {
    try {
        throw new TypeError('ha--0-0-456');
    } catch (error) {
        // Sentry.captureException(error, {
        //     extra: { error, other: { abc: 123 }, func: 'Sentry.captureException(error' },
        // });
        // Sentry.captureException('Haind captureException', {
        //     extra: { error, other: { abc: 123 } },
        // });
        Sentry.captureMessage('Haind captureMessage22', error);
    }
}

run();
