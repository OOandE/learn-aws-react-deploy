import React, { useState } from "react";
import { TemplateForm } from "../components/TemplateForm.js";

export const TemplateFormView = () => {
  const [template, setTemplate] = useState({
    id: 1,
    name: "Client Risk Assessment",
    type: "healthAssessment",
    data: {
      clientInformation: {
        fullName: "John Doe",
        dateOfBirth: "1985-01-01",
        address: "123 Main St",
        phoneNumber: "+1234567890",
        emergencyContact: {
          name: "Jane Doe",
          relationship: "Spouse",
          phoneNumber: "+1987654321",
        },
      },
      assessmentDate: {
        dateOfAssessment: "2024-07-01",
        assessorsName: "Dr. Smith",
        position: "Medical Director",
        contactInformation: "dr.smith@example.com",
      },
      healthAndMedicalRisks: {
        chronicConditions: [
          {
            condition: "Hypertension",
            potentialRisks: "Increased risk of stroke",
            mitigationStrategies: "Monitor blood pressure regularly",
          },
        ],
        medications: [
          {
            medication: "Lisinopril",
            potentialSideEffects: "Dizziness, dry cough",
            risks: "Hypotension if not taken correctly",
            mitigationStrategies: "Educate patient on proper usage",
          },
        ],
        allergies: [
          {
            allergen: "Penicillin",
            reaction: "Hives",
            risks: "Anaphylactic shock if exposed",
            mitigationStrategies: "Avoid penicillin and carry epinephrine",
          },
        ],
        mobilityAndFallRisks: {
          mobilityLevel: "Limited mobility",
          potentialRisks: "Risk of falls",
          mitigationStrategies: "Use of assistive devices",
        },
      },
      environmentalRisks: {
        homeSafety: [
          {
            hazard: "Slippery floors",
            potentialRisks: "Risk of falls",
            mitigationStrategies: "Install non-slip mats",
          },
        ],
        accessibility: [
          {
            area: "Bathroom",
            potentialRisks: "Difficulty accessing shower",
            mitigationStrategies: "Install grab bars",
          },
        ],
        emergencyPreparedness: [
          {
            risk: "Fire hazard",
            potentialEmergency: "Fire outbreak",
            mitigationStrategies: "Ensure smoke detectors are working",
          },
        ],
      },
      personalCareRisks: {
        activitiesOfDailyLiving: [
          {
            task: "Dressing",
            potentialRisks: "Difficulty due to arthritis",
            mitigationStrategies: "Provide adaptive clothing",
          },
        ],
        instrumentalActivitiesOfDailyLiving: [
          {
            task: "Managing finances",
            potentialRisks: "Financial mismanagement",
            mitigationStrategies: "Assist with budgeting",
          },
        ],
      },
      socialAndEmotionalRisks: {
        isolation: {
          potentialRisks: "Social withdrawal",
          mitigationStrategies: "Encourage social activities",
        },
        mentalHealth: {
          potentialRisks: "Anxiety",
          mitigationStrategies: "Refer to counseling services",
        },
      },
      fireSafetyRisks: {
        potentialRisks: "Fire hazards in kitchen",
        mitigationStrategies: "Install fire extinguisher",
      },
      abuseAndNeglectRisks: {
        potentialRisks: "Financial exploitation",
        mitigationStrategies: "Educate on financial scams",
      },
      nutritionalRisks: {
        potentialRisks: "Poor diet",
        mitigationStrategies: "Provide nutritional counseling",
      },
      reviewAndMonitoring: {
        initialReviewDate: "2024-07-15",
        reviewFrequency: "Quarterly",
        nextReviewDate: "2024-10-15",
      },
      assessorsNotesAndRecommendations: {
        notes: "Client responds well to medication regimen.",
        recommendations: "Schedule follow-up appointment in 3 months.",
      },
      signatures: {
        client: {
          name: "John Doe",
          signature: "base64-encoded-image-string",
          date: "2024-07-01",
        },
        assessor: {
          name: "Dr. Smith",
          signature: "base64-encoded-image-string",
          date: "2024-07-01",
        },
        careCoordinator: {
          name: "Jane Smith",
          signature: "base64-encoded-image-string",
          date: "2024-07-01",
        },
      },
    },
  });
  return (
    <div className="template__details">
      <TemplateForm template={template.data} />
      <button className="btn btn__primary btn--sm">Submit template</button>
    </div>
  );
};
