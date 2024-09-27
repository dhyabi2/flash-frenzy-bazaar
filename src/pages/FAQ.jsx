import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ThumbsUp, ThumbsDown } from 'lucide-react';

const faqCategories = [
  {
    name: "General",
    icon: "🌟",
    questions: [
      {
        question: "ما هو البيع الفلاشي؟",
        answer: "البيع الفلاشي هو حدث ترويجي مثير يقدم خصومات كبيرة على فئة معينة من المنتجات لفترة زمنية محدودة، مما يخلق شعورًا بالإلحاح والإثارة للمتسوقين."
      },
      {
        question: "كيف يمكنني الاستفادة القصوى من البيع الفلاشي؟",
        answer: "لتحقيق أقصى استفادة، تابع جدولنا اليومي، واضبط التنبيهات، وكن مستعدًا للتصرف بسرعة. النصيحة الذهبية: اختر منتجاتك مسبقًا!"
      }
    ]
  },
  {
    name: "الشراء",
    icon: "🛒",
    questions: [
      {
        question: "هل يمكنني إرجاع المنتجات التي اشتريتها خلال البيع الفلاشي؟",
        answer: "نعم، تخضع جميع المشتريات لسياسة الإرجاع القياسية الخاصة بنا. ومع ذلك، نظرًا للطبيعة الخاصة للبيع الفلاشي، يرجى التأكد من قراءة شروط الإرجاع بعناية."
      },
      {
        question: "كيف يتم التعامل مع الشحن خلال البيع الفلاشي؟",
        answer: "نحن نضمن شحنًا سريعًا لجميع طلبات البيع الفلاشي. في الواقع، لدينا فريق مخصص لضمان وصول منتجات البيع الفلاشي إليك بأسرع وقت ممكن!"
      }
    ]
  },
  {
    name: "تقني",
    icon: "💻",
    questions: [
      {
        question: "ماذا أفعل إذا واجهت مشكلة تقنية أثناء البيع الفلاشي؟",
        answer: "لا تقلق! لدينا فريق دعم فني متاح على مدار الساعة خلال البيع الفلاشي. يمكنك الوصول إليهم عبر الدردشة المباشرة أو الاتصال بالرقم الموجود في صفحة الاتصال."
      },
      {
        question: "هل يمكنني استخدام التطبيق والموقع الإلكتروني في نفس الوقت للبيع الفلاشي؟",
        answer: "بالتأكيد! في الواقع، نشجع على ذلك. استخدام كلا المنصتين يمكن أن يزيد من فرصك في الحصول على الصفقات التي تريدها قبل نفادها."
      }
    ]
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState({});

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleFeedback = (categoryIndex, questionIndex, isHelpful) => {
    setFeedbackGiven(prev => ({
      ...prev,
      [`${categoryIndex}-${questionIndex}`]: isHelpful
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-indigo-800"
        >
          استكشف عالم البيع الفلاشي
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 relative"
        >
          <Input
            type="text"
            placeholder="ابحث في الأسئلة الشائعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 text-lg rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
        </motion.div>

        <AnimatePresence>
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-8 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-indigo-600 text-white p-4 flex items-center">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h2 className="text-2xl font-semibold">{category.name}</h2>
              </div>
              <Accordion type="single" collapsible className="p-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                    <AccordionTrigger className="text-right text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-right">
                      <p className="mb-4">{faq.answer}</p>
                      <div className="flex justify-end items-center mt-2">
                        <span className="mr-2 text-sm text-gray-600">هل كانت هذه الإجابة مفيدة؟</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleFeedback(categoryIndex, questionIndex, true)}
                          disabled={feedbackGiven[`${categoryIndex}-${questionIndex}`] !== undefined}
                        >
                          <ThumbsUp className={`h-4 w-4 ${feedbackGiven[`${categoryIndex}-${questionIndex}`] === true ? 'text-green-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFeedback(categoryIndex, questionIndex, false)}
                          disabled={feedbackGiven[`${categoryIndex}-${questionIndex}`] !== undefined}
                        >
                          <ThumbsDown className={`h-4 w-4 ${feedbackGiven[`${categoryIndex}-${questionIndex}`] === false ? 'text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FAQ;