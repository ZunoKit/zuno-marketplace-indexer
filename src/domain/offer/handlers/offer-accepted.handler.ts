/**
 * Offer Accepted Handler
 */

import type { OfferAcceptedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

export async function handleOfferAccepted({ event, context }: { event: any; context: any }) {
  const args = event.args as OfferAcceptedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("OfferAccepted", contractAddress, event.block.number, event.transaction.hash);

  try {
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });

    await eventLogRepo.createFromEvent("OfferAccepted", contractAddress, null, args, {
      block: event.block,
      transaction: event.transaction,
      log: event.log,
    });

    logger.logEventSuccess("OfferAccepted", { offerId: args.offerId });
  } catch (error) {
    logger.logEventError("OfferAccepted", error as Error, { args });
    throw error;
  }
}
