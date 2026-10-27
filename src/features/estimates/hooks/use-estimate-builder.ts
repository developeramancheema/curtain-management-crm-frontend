'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type {
  EstimateCustomerDetails,
  EstimateDraft,
  EstimateItem,
  EstimateRoom,
  EstimateStepId,
  RoomMeasurement,
} from '../types';
import { buildItemsFromMeasurements, calculateEstimateTotals } from '../utils';
import { ESTIMATE_STEPS } from '../mock/estimates.mock';

const EMPTY_MEASUREMENT: Omit<RoomMeasurement, 'id'> = {
  windowName: 'Window 1',
  width: 0,
  height: 0,
  plainPanels: 0,
  netPanels: 0,
  fabricPerPanel: 3.5,
  blackoutBack: false,
  channelLength: 0,
  stitchingPieces: 0,
  notes: '',
};

const EMPTY_ITEM: Omit<EstimateItem, 'id'> = {
  description: '',
  measurementNote: '',
  quantity: 0,
  unit: 'Mtr',
  rate: 0,
};

export function useEstimateBuilder(initialDraft: EstimateDraft) {
  const [draft, setDraft] = useState<EstimateDraft>(initialDraft);
  const [currentStep, setCurrentStep] = useState<EstimateStepId>('customer');

  // Sequential ids keep newly created rows stable across renders without
  // introducing non-deterministic values that would break hydration.
  const idCounter = useRef(0);
  const nextId = useCallback((prefix: string) => {
    idCounter.current += 1;
    return `${prefix}-new-${idCounter.current}`;
  }, []);

  const stepIndex = ESTIMATE_STEPS.findIndex((step) => step.id === currentStep);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ESTIMATE_STEPS.length - 1;

  const generateMissingItems = useCallback(() => {
    setDraft((current) => ({
      ...current,
      rooms: current.rooms.map((room) => {
        if (room.items.length > 0) return room;
        return {
          ...room,
          items: buildItemsFromMeasurements(room.measurements, nextId),
        };
      }),
    }));
  }, [nextId]);

  const goToStep = useCallback(
    (step: EstimateStepId) => {
      if (
        currentStep === 'measurements' &&
        (step === 'items' || step === 'review')
      ) {
        generateMissingItems();
      }
      setCurrentStep(step);
    },
    [currentStep, generateMissingItems]
  );

  const goNext = useCallback(() => {
    if (currentStep === 'measurements') {
      generateMissingItems();
    }
    setCurrentStep((current) => {
      const index = ESTIMATE_STEPS.findIndex((step) => step.id === current);
      return ESTIMATE_STEPS[Math.min(index + 1, ESTIMATE_STEPS.length - 1)].id;
    });
  }, [currentStep, generateMissingItems]);

  const goBack = useCallback(() => {
    setCurrentStep((current) => {
      const index = ESTIMATE_STEPS.findIndex((step) => step.id === current);
      return ESTIMATE_STEPS[Math.max(index - 1, 0)].id;
    });
  }, []);

  const updateCustomer = useCallback(
    (patch: Partial<EstimateCustomerDetails>) => {
      setDraft((current) => ({
        ...current,
        customer: { ...current.customer, ...patch },
      }));
    },
    []
  );

  const addRoom = useCallback(() => {
    const roomId = nextId('room');
    setDraft((current) => ({
      ...current,
      rooms: [
        ...current.rooms,
        {
          id: roomId,
          name: `Room ${current.rooms.length + 1}`,
          measurements: [{ ...EMPTY_MEASUREMENT, id: `${roomId}-m-1` }],
          items: [],
        },
      ],
    }));
    return roomId;
  }, [nextId]);

  const updateRoom = useCallback(
    (roomId: string, patch: Partial<Omit<EstimateRoom, 'id'>>) => {
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId ? { ...room, ...patch } : room
        ),
      }));
    },
    []
  );

  const removeRoom = useCallback((roomId: string) => {
    setDraft((current) => ({
      ...current,
      rooms: current.rooms.filter((room) => room.id !== roomId),
    }));
  }, []);

  const duplicateRoom = useCallback(
    (roomId: string) => {
      const suffix = nextId('copy');
      setDraft((current) => {
        const source = current.rooms.find((room) => room.id === roomId);
        if (!source) return current;

        const clone: EstimateRoom = {
          ...source,
          id: suffix,
          name: `${source.name} (Copy)`,
          measurements: source.measurements.map((measurement, index) => ({
            ...measurement,
            id: `${suffix}-m-${index + 1}`,
          })),
          items: source.items.map((item, index) => ({
            ...item,
            id: `${suffix}-i-${index + 1}`,
          })),
        };

        const insertAt = current.rooms.findIndex((room) => room.id === roomId);
        const rooms = [...current.rooms];
        rooms.splice(insertAt + 1, 0, clone);
        return { ...current, rooms };
      });
    },
    [nextId]
  );

  const addMeasurement = useCallback(
    (roomId: string) => {
      const measurementId = nextId('m');
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                measurements: [
                  ...room.measurements,
                  {
                    ...EMPTY_MEASUREMENT,
                    id: measurementId,
                    windowName: `Window ${room.measurements.length + 1}`,
                  },
                ],
              }
            : room
        ),
      }));
    },
    [nextId]
  );

  const updateMeasurement = useCallback(
    (
      roomId: string,
      measurementId: string,
      patch: Partial<Omit<RoomMeasurement, 'id'>>
    ) => {
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                measurements: room.measurements.map((measurement) =>
                  measurement.id === measurementId
                    ? { ...measurement, ...patch }
                    : measurement
                ),
              }
            : room
        ),
      }));
    },
    []
  );

  const removeMeasurement = useCallback(
    (roomId: string, measurementId: string) => {
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                measurements: room.measurements.filter(
                  (measurement) => measurement.id !== measurementId
                ),
              }
            : room
        ),
      }));
    },
    []
  );

  const addItem = useCallback(
    (roomId: string, preset?: Partial<Omit<EstimateItem, 'id'>>) => {
      const itemId = nextId('i');
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                items: [
                  ...room.items,
                  { ...EMPTY_ITEM, ...preset, id: itemId },
                ],
              }
            : room
        ),
      }));
    },
    [nextId]
  );

  const updateItem = useCallback(
    (
      roomId: string,
      itemId: string,
      patch: Partial<Omit<EstimateItem, 'id'>>
    ) => {
      setDraft((current) => ({
        ...current,
        rooms: current.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                items: room.items.map((item) =>
                  item.id === itemId ? { ...item, ...patch } : item
                ),
              }
            : room
        ),
      }));
    },
    []
  );

  const removeItem = useCallback((roomId: string, itemId: string) => {
    setDraft((current) => ({
      ...current,
      rooms: current.rooms.map((room) =>
        room.id === roomId
          ? { ...room, items: room.items.filter((item) => item.id !== itemId) }
          : room
      ),
    }));
  }, []);

  const setDiscountPercent = useCallback((discountPercent: number) => {
    setDraft((current) => ({ ...current, discountPercent }));
  }, []);

  const setApplyGst = useCallback((applyGst: boolean) => {
    setDraft((current) => ({ ...current, applyGst }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setDraft((current) => ({ ...current, notes }));
  }, []);

  const setTerms = useCallback((terms: string[]) => {
    setDraft((current) => ({ ...current, terms }));
  }, []);

  const totals = useMemo(
    () =>
      calculateEstimateTotals({
        rooms: draft.rooms,
        discountPercent: draft.discountPercent,
        applyGst: draft.applyGst,
        gstRate: draft.gstRate,
      }),
    [draft.rooms, draft.discountPercent, draft.applyGst, draft.gstRate]
  );

  return {
    draft,
    totals,
    currentStep,
    stepIndex,
    isFirstStep,
    isLastStep,
    goToStep,
    goNext,
    goBack,
    updateCustomer,
    addRoom,
    updateRoom,
    removeRoom,
    duplicateRoom,
    addMeasurement,
    updateMeasurement,
    removeMeasurement,
    addItem,
    updateItem,
    removeItem,
    setDiscountPercent,
    setApplyGst,
    setNotes,
    setTerms,
  };
}

export type EstimateBuilder = ReturnType<typeof useEstimateBuilder>;
