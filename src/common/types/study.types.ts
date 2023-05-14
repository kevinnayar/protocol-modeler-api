import { z } from 'zod';

const CountryLanguageTypeSchema = z.object({
  uuid: z.string().optional().nullable(),
  country: z.string().nullable(),
  language: z.string().nullable(),
});

const CodedValueSchema = z.object({
  uuid: z.string().optional().nullable(),
  code: z.string().nullable(),
  codeSystem: z.string().nullable(),
  codeSystemVersion: z.string().nullable(),
  decode: z.string().nullable(),
});

const TransitionRuleSchema = z.object({
  uuid: z.string().optional().nullable(),
  transitionRuleDescription: z.string().nullable(),
});

const StudyArmSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyArmName: z.string().nullable(),
  studyArmType: CodedValueSchema.nullable(),
  studyArmDescription: z.string().nullable(),
  studyArmDataOriginType: CodedValueSchema.nullable(),
  studyArmDataOriginDescription: z.string().nullable(),
});

const StudyElementSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyElementDescription: z.string().nullable(),
  studyElementName: z.string().nullable(),
  transitionStartRule: TransitionRuleSchema.nullable(),
  transitionEndRule: TransitionRuleSchema.nullable(),
});

const EncounterSchema = z.object({
  uuid: z.string().optional().nullable(),
  encounterDescription: z.string().nullable(),
  encounterName: z.string().nullable(),
  encounterContactMode: z.array(CodedValueSchema).nullable(),
  encounterEnvironmentalSetting: z.array(CodedValueSchema).nullable(),
  encounterType: z.array(CodedValueSchema).nullable(),
  transitionStartRule: TransitionRuleSchema.nullable(),
  transitionEndRule: TransitionRuleSchema.nullable(),
  nextEncounterId: z.string().optional().nullable(),
  previousEncounterId: z.string().optional().nullable(),
});

const StudyEpochSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyEpochDescription: z.string().nullable(),
  studyEpochName: z.string().nullable(),
  studyEpochType: z.array(CodedValueSchema).nullable(),
  encounters: z.array(EncounterSchema).nullable(),
  nextStudyEpochId: z.string().optional().nullable(),
  previousStudyEpochId: z.string().optional().nullable(),
});

const StudyInvestigationalInterventionSchema = z.object({
  uuid: z.string().optional().nullable(),
  interventionDescription: z.string().nullable(),
  codes: z.array(CodedValueSchema).nullable(),
});

const VariableOfInterestSchema = z.object({
  uuid: z.string().optional().nullable(),
  endpointDescription: z.string().nullable(),
  endpointPurposeDescription: z.string().nullable(),
  endpointLevel: z.array(CodedValueSchema).nullable(),
});

const PopulationSchema = z.object({
  uuid: z.string().optional().nullable(),
  populationDescription: z.string().nullable(),
});

const IntercurrentEventSchema = z.object({
  uuid: z.string().optional().nullable(),
  intercurrentEventDescription: z.string().nullable(),
  intercurrentEventName: z.string().nullable(),
  intercurrentEventStrategy: z.string().nullable(),
});

const StudyIndicationSchema = z.object({
  uuid: z.string().optional().nullable(),
  indicationDescription: z.string().nullable(),
  codes: z.array(CodedValueSchema).nullable(),
});

const StudyObjectiveSchema = z.object({
  uuid: z.string().optional().nullable(),
  objectiveDescription: z.string().nullable(),
  objectiveLevel: z.array(CodedValueSchema).nullable(),
  objectiveEndpoints: z.array(VariableOfInterestSchema).nullable(),
});

const DefinedProcedureSchema = z.object({
  uuid: z.string().optional().nullable(),
  procedureType: z.string().nullable(),
  procedureCode: z.array(CodedValueSchema).nullable(),
});

const StudyDataCollectionSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyDataName: z.string().nullable(),
  studyDataDescription: z.string().nullable(),
  crfLink: z.string().nullable(),
});

const WorkflowItemActivitySchema = z.object({
  uuid: z.string().optional().nullable(),
  activityDescription: z.string().nullable(),
  activityName: z.string().nullable(),
  definedProcedures: z.array(DefinedProcedureSchema).nullable(),
  studyDataCollection: z.array(StudyDataCollectionSchema).nullable(),
  nextActivityId: z.string().optional().nullable(),
  previousActivityId: z.string().optional().nullable(),
});

const WorkflowItemSchema = z.object({
  uuid: z.string().optional().nullable(),
  workflowItemDescription: z.string().nullable(),
  workflowItemActivity: WorkflowItemActivitySchema.nullable(),
  workflowItemEncounter: EncounterSchema.nullable(),
  nextWorkflowItemId: z.string().optional().nullable(),
  previousWorkflowItemId: z.string().optional().nullable(),
});

const StudyWorkflowSchema = z.object({
  uuid: z.string().optional().nullable(),
  workflowDescription: z.string().nullable(),
  workflowItems: z.array(WorkflowItemSchema).nullable(),
});

const StudyIdentifierScopeSchema = z.object({
  uuid: z.string().optional().nullable(),
  organisationIdentifier: z.string().nullable(),
  organisationIdentifierScheme: z.string().nullable(),
  organisationName: z.string().nullable(),
  organisationType: CodedValueSchema.nullable(),
});

const StudyIdentifierSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyIdentifier: z.string().nullable(),
  studyIdentifierScope: StudyIdentifierScopeSchema.nullable(),
});

const StudyEstimandSchema = z.object({
  uuid: z.string().optional().nullable(),
  treatment: StudyInvestigationalInterventionSchema.nullable(),
  summaryMeasure: z.string().nullable(),
  analysisPopulation: PopulationSchema.nullable(),
  variableOfInterest: VariableOfInterestSchema.nullable(),
  intercurrentEvents: z.array(IntercurrentEventSchema).nullable(),
});

const StudyProtocolVersionSchema = z.object({
  uuid: z.string().optional().nullable(),
  briefTitle: z.string().nullable(),
  officialTitle: z.string().nullable(),
  protocolAmendment: z.string().nullable(),
  protocolEffectiveDate: z.string().nullable(),
  protocolStatus: z.array(CodedValueSchema).nullable(),
  protocolVersion: z.string().nullable(),
  publicTitle: z.string().nullable(),
  scientificTitle: z.string().nullable(),
});

const StudyCellSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyArm: StudyArmSchema.optional().nullable(),
  studyEpoch: StudyEpochSchema.optional().nullable(),
  studyElements: z.array(StudyElementSchema).optional().nullable(),
});

export const StudyDesignSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyDesignName: z.string().optional().nullable(),
  studyDesignDescription: z.string().optional().nullable(),
  studyDesignRationale: z.string().optional().nullable(),
  interventionModel: CodedValueSchema.optional().nullable(),
  trialIntentType: z.array(CodedValueSchema).optional().nullable(),
  trialType: z.array(CodedValueSchema).optional().nullable(),
  studyIndications: z.array(StudyIndicationSchema).optional().nullable(),
  studyInvestigationalInterventions: z
    .array(StudyInvestigationalInterventionSchema)
    .optional()
    .nullable(),
  studyObjectives: z.array(StudyObjectiveSchema).optional().nullable(),
  studyPopulations: z.array(PopulationSchema).optional().nullable(),
  studyCells: z.array(StudyCellSchema).optional().nullable(),
  studyWorkflows: z.array(StudyWorkflowSchema).optional().nullable(),
  studyEstimands: z.array(StudyEstimandSchema).optional().nullable(),
});

export type StudyDesignEntity = z.infer<typeof StudyDesignSchema>;

export const ProtocolSchema = z.object({
  uuid: z.string().optional().nullable(),
  studyTitle: z.string().optional().nullable(),
  studyRationale: z.string().optional().nullable(),
  studyAcronym: z.string().optional().nullable(),
  studyType: CodedValueSchema.optional().nullable(),
  studyIdentifiers: z.array(StudyIdentifierSchema).optional().nullable(),
  studyPhase: CodedValueSchema.optional().nullable(),
  studyProtocolVersions: z
    .array(StudyProtocolVersionSchema)
    .optional()
    .nullable(),
  studyDesigns: z.array(StudyDesignSchema).optional().nullable(),
  studyVersion: z.string().optional().nullable(),
  studyLocales: z.array(CountryLanguageTypeSchema).optional().nullable(),
});

export type ProtocolEntity = z.infer<typeof ProtocolSchema>;

const AuditTrailSchema = z.object({
  createdBy: z.string().nullable(),
  entryDateTime: z.string().nullable(),
  sdrUploadVersion: z.number().nullable(),
});

export type AuditTrailEntity = z.infer<typeof AuditTrailSchema>;
