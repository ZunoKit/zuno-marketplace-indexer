/**
 * Offer Cancelled Handler
 */

import type { OfferCancelledEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

export async function handleOfferCancelled({ event, context }: { event: any; context: any }) {
  const args = event.args as OfferCancelledEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("OfferCancelled", contractAddress, event.block.number, event.transaction.hash);

  try {
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });

    await eventLogRepo.createFromEvent("OfferCancelled", contractAddress, null, args, {
      block: event.block,
      transaction: event.transaction,
      log: event.log,
    });

    logger.logEventSuccess("OfferCancelled", { offerId: args.offerId });
  } catch (error) {
    logger.logEventError("OfferCancelled", error as Error, { args });
    throw error;
  }
}
