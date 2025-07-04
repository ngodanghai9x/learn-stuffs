const JOBS: { id: string; status: string; attemptCount: number }[] = [];
const REDIS = new Map<string, number>();

class RetryableError extends Error {
    isRetryable = true;
}

const validateOrderItem = (order: any) => {
    if (!order.image) {
        throw new RetryableError('something ...');
    }

    if (!order.orderItems) {
        throw new RetryableError('something ...');
    }
    (order.orderItems as any[]).forEach((orderItem) => {
        if (!orderItem.image) {
            throw new RetryableError('something ...');
        }
    });
};

const importProcess = async (payload: any) => {
    const job = JOBS.find((j) => payload.job_id === j.id);
    const attemptCount = REDIS.get(job.id);
    // check job.status
    if (job.status === 'FAILED') {
        return null;
    }
    if (job.status === 'RETRYING') {
        if (job.attemptCount > 10 || attemptCount > 10) {
            return null;
        }
    }

    try {
        // validate
        validateOrderItem(payload.order);

        // upload s3

        // save db
        return payload.order.id;
    } catch (error: any) {
        if (error.isRetryable) {
            // check attempt count
            if (job.attemptCount > 10 || attemptCount > 10) {
                return null;
            }

            // update job to RETRYING
            REDIS.set(job.id, attemptCount + 1);

            return null;
        } else {
            // update job to FAILED
            // END
            return null;
        }
    }
};
