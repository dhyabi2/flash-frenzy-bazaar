import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "ما هو البيع الفلاشي؟",
      answer: "البيع الفلاشي هو عرض ترويجي قصير المدة يقدم خصومات كبيرة على فئة معينة من المنتجات لفترة زمنية محدودة."
    },
    {
      question: "كيف أشارك في البيع الفلاشي؟",
      answer: "ما عليك سوى تصفح الصفحة الرئيسية خلال وقت البيع الفلاشي واختيار المنتجات التي ترغب في شرائها. تأكد من إتمام عملية الشراء قبل انتهاء العرض."
    },
    {
      question: "هل يمكنني إرجاع المنتجات التي اشتريتها خلال البيع الفلاشي؟",
      answer: "نعم، تخضع جميع المشتريات لسياسة الإرجاع القياسية الخاصة بنا. يرجى مراجعة صفحة سياسة الإرجاع للحصول على التفاصيل الكاملة."
    },
    {
      question: "كم مرة تقومون بإجراء مبيعات فلاشية؟",
      answer: "نقوم بإجراء مبيعات فلاشية يومياً، مع تغيير الفئة المعروضة كل يوم. يمكنك الاطلاع على جدول الفئات في صفحة الجدول."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-right">الأسئلة الشائعة</h1>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-right">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;