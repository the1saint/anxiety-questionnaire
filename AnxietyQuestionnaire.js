import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const AnxietyQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    situational: [],
    environmental: [],
    cognitive: [],
    physical: [],
    emotional: [],
    other: ''
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      title: "Declanșatori situaționali",
      type: "checkbox",
      category: "situational",
      options: [
        "Vorbitul în public",
        "Spațiile aglomerate",
        "Întâlnirile sociale"
      ]
    },
    {
      title: "Declanșatori de mediu",
      type: "checkbox",
      category: "environmental",
      options: [
        "Zgomote puternice",
        "Lumini puternice",
        "Anumite mirosuri"
      ]
    },
    {
      title: "Declanșatori cognitivi",
      type: "checkbox",
      category: "cognitive",
      options: [
        "Dialog intern negativ",
        "Gânduri catastrofice",
        "Teama de eșec"
      ]
    },
    {
      title: "Declanșatori fizici",
      type: "checkbox",
      category: "physical",
      options: [
        "Lipsa odihnei, a somnului",
        "Foamea",
        "Consumul de cofeină"
      ]
    },
    {
      title: "Declanșatori emoționali",
      type: "checkbox",
      category: "emotional",
      options: [
        "Stresul",
        "Conflictul",
        "Responsabilitățile copleșitoare"
      ]
    }
  ];

  const handleCheckboxChange = (category, option) => {
    setAnswers(prev => {
      const current = [...prev[category]];
      if (current.includes(option)) {
        return { ...prev, [category]: current.filter(item => item !== option) };
      } else {
        return { ...prev, [category]: [...current, option] };
      }
    });
  };

  const generateFeedback = () => {
    let feedback = [];
    let totalTriggers = Object.values(answers).flat().length;

    if (totalTriggers === 0) {
      return "Nu ai selectat niciun declanșator. Este important să identifici factorii care îți pot influența anxietatea pentru a putea dezvolta strategii eficiente de gestionare.";
    }

    // Analiza pe categorii
    Object.entries(answers).forEach(([category, selected]) => {
      if (selected.length > 0) {
        switch(category) {
          case 'situational':
            feedback.push("Observ că situațiile sociale îți provoacă anxietate. Poți începe prin expunerea graduală la astfel de situații, începând cu cele mai puțin anxiogene.");
            break;
          case 'environmental':
            feedback.push("Factorii de mediu par să fie importanți pentru tine. Încearcă să-ți creezi un mediu controlat și să ai pregătite strategii de coping pentru momentele când nu poți controla mediul.");
            break;
          case 'cognitive':
            feedback.push("Gândurile negative joacă un rol important în anxietatea ta. Tehnicile de restructurare cognitivă ar putea fi foarte utile pentru tine.");
            break;
          case 'physical':
            feedback.push("Starea fizică îți influențează nivelul de anxietate. Focusează-te pe îmbunătățirea rutinei de somn și a obiceiurilor alimentare.");
            break;
          case 'emotional':
            feedback.push("Factori emoționali puternici îți declanșează anxietatea. Învățarea unor tehnici de reglare emoțională ar putea fi benefică.");
            break;
        }
      }
    });

    return feedback.join("\n\n");
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Rezultatul analizei tale:</h2>
        <div className="whitespace-pre-line">
          {generateFeedback()}
        </div>
        <Button 
          className="mt-4"
          onClick={() => {
            setShowResults(false);
            setCurrentStep(0);
            setAnswers({
              situational: [],
              environmental: [],
              cognitive: [],
              physical: [],
              emotional: [],
              other: ''
            });
          }}
        >
          Începe din nou
        </Button>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            Pasul {currentStep + 1} din {questions.length}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">{currentQuestion.title}</h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={answers[currentQuestion.category].includes(option)}
                onCheckedChange={() => handleCheckboxChange(currentQuestion.category, option)}
              />
              <label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Înapoi
          </Button>
          <Button onClick={handleNext}>
            {currentStep === questions.length - 1 ? 'Vezi rezultatele' : 'Următoarea întrebare'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnxietyQuestionnaire;
