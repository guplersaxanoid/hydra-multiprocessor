import { SubstrateBlock, SubstrateEvent } from '@dzlzv/hydra-common'
import { Range } from '../start/manifest'

export enum Kind {
  EXTRINSIC = 'EXTRINSIC',
  EVENT = 'EVENT',
  BLOCK = 'BLOCK',
}

export interface EventData {
  // TODO: update interfaces in hydra-common
  event: SubstrateEvent
  kind: Kind
}

export interface BlockData {
  block: SubstrateBlock

  events: EventData[]
}

export interface IEventQueue {
  isEmpty(): boolean
  blocks(): AsyncGenerator<BlockData, void, void>
  start(): Promise<void>
  stop(): void
}

/**
 * Describes a block range and id_gt filters for fetching events within a certain range
 */
export interface RangeFilter {
  id: {
    gt: string //  events after this event ID
  }
  block: {
    // events in the block range (gt, lte]
    gt: number
    lte: number
  }
  limit: number // fetch at most that many events
}

// export interface FilterConfig extends RangeFilter {
//   events: string[]
//   extrinsics: {
//     names: string[]
//     triggerEvents: string[]
//   }
//   blocks: number[]
// }

/**
 * Describes a set of query filters derived from the
 * mapping definition
 */
export interface MappingFilter {
  range: Range
  events: string[]
  extrinsics: {
    names: string[]
    triggerEvents: string[]
  }
  // TODO: implement arbitrary block filters
  // blockHooks: { height?: Range }[]
}