/**
 * Offer Created Handler
 */

import type { OfferCreatedEvent } from "../../../shared/types/events";
import { getEventLogger } from "../../../infrastructure/logging/event-logger";
import { EventLogRepository } from "../../../repositories/event-log.repository";

const logger = getEventLogger();

export async function handleOfferCreated({ event, context }: { event: any; context: any }) {
  const args = event.args as OfferCreatedEvent;
  const contractAddress = event.log.address;

  logger.logEventStart("OfferCreated", contractAddress, event.block.number, event.transaction.hash);

  try {
    const eventLogRepo = new EventLogRepository({ db: context.db, network: context.network });

    await eventLogRepo.createFromEvent("OfferCreated", contractAddress, null, args, {
      block: event.block,
      transaction: event.transaction,
      log: event.log,
    });

    logger.logEventSuccess("OfferCreated", { offerId: args.offerId, offerer: args.offerer });
  } catch (error) {
    logger.logEventError("OfferCreated", error as Error, { args });
    throw error;
  }
}
