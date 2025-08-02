import React from 'react';
import PriceCalculator from '@/components/price-calculator';
import { FadeIn } from "@/components/ui/fade-in";

export function ProjectCalculatorSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <FadeIn>
        <PriceCalculator />
      </FadeIn>
    </section>
  );
}