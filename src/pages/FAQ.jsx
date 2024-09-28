import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ThumbsUp, ThumbsDown } from 'lucide-react';

const faqCategories = [
  {
    name: "عام",
    icon: "🌟",
    questions: [
      {
        question: "ما هو كل يوم؟",
        answer: "كل يوم هو حدث ترويجي مثير يقدم خصومات كبيرة على فئة معينة من المنتجات لفترة زمنية محدودة، مما يخلق شعورًا بالإلحاح والإثارة للمتسوقين."
      },
      {
        question: "كيف يمكنني الاستفادة القصوى من كل يوم؟",
        answer: "لتحقيق أقصى استفادة، تابع جدولنا اليومي، واضبط التنبيهات، وكن مستعدًا للتصرف بسرعة. النصيحة الذهبية: اختر منتجاتك مسبقًا!"
      },
      {
        question: "هل يتغير جدول الفئات؟",
        answer: "نعم، نقوم بتحديث جدول الفئات بشكل دوري لضمان تنوع العروض. تأكد من مراجعة الجدول أسبوعيًا للبقاء على اطلاع بأحدث الفئات."
      },
      {
        question: "هل يمكنني اقتراح فئات جديدة؟",
        answer: "بالتأكيد! نرحب دائمًا باقتراحات عملائنا. يمكنك إرسال اقتراحاتك عبر صفحة 'اتصل بنا' وسنأخذها بعين الاعتبار عند تخطيط الفئات المستقبلية."
      }
    ]
  },
  {
    name: "الشراء",
    icon: "🛒",
    questions: [
      {
        question: "هل يمكنني إرجاع المنتجات التي اشتريتها خلال كل يوم؟",
        answer: "نعم، تخضع جميع المشتريات لسياسة الإرجاع القياسية الخاصة بنا. ومع ذلك، نظرًا للطبيعة الخاصة لكل يوم، يرجى التأكد من قراءة شروط الإرجاع بعناية."
      },
      {
        question: "كيف يتم التعامل مع الشحن خلال كل يوم؟",
        answer: "نحن نضمن شحنًا سريعًا لجميع طلبات كل يوم. في الواقع، لدينا فريق مخصص لضمان وصول منتجات كل يوم إليك بأسرع وقت ممكن!"
      },
      {
        question: "هل هناك حد أدنى للطلب؟",
        answer: "لا يوجد حد أدنى للطلب في كل يوم. يمكنك شراء منتج واحد أو عدة منتجات حسب رغبتك."
      },
      {
        question: "هل يمكنني الجمع بين عروض كل يوم وكوبونات الخصم؟",
        answer: "عادةً لا يمكن الجمع بين عروض كل يوم وكوبونات الخصم الأخرى، نظرًا لأن أسعار كل يوم مخفضة بالفعل. ومع ذلك، قد تكون هناك عروض خاصة في بعض المناسبات."
      }
    ]
  },
  {
    name: "تقني",
    icon: "💻",
    questions: [
      {
        question: "ماذا أفعل إذا واجهت مشكلة تقنية أثناء كل يوم؟",
        answer: "لا تقلق! لدينا فريق دعم فني متاح على مدار الساعة خلال كل يوم. يمكنك الوصول إليهم عبر الدردشة المباشرة أو الاتصال بالرقم الموجود في صفحة الاتصال."
      },
      {
        question: "هل يمكنني استخدام التطبيق والموقع الإلكتروني في نفس الوقت لكل يوم؟",
        answer: "بالتأكيد! في الواقع، نشجع على ذلك. استخدام كلا المنصتين يمكن أن يزيد من فرصك في الحصول على الصفقات التي تريدها قبل نفادها."
      },
      {
        question: "هل هناك ميزة للإشعارات للتذكير بالعروض اليومية؟",
        answer: "نعم، يمكنك تفعيل الإشعارات في تطبيقنا للهواتف الذكية لتلقي تنبيهات يومية حول الفئات الجديدة والعروض الخاصة. تأكد من تفعيل الإشعارات في إعدادات التطبيق."
      },
      {
        question: "كيف يمكنني التأكد من أمان معلوماتي الشخصية؟",
        answer: "نحن نأخذ أمان بيانات عملائنا على محمل الجد. نستخدم تقنيات تشفير متقدمة لحماية معلوماتك الشخصية وبيانات الدفع. يمكنك الاطلاع على سياسة الخصوصية الخاصة بنا للمزيد من التفاصيل."
      }
    ]
  },
  {
    name: "البائعون",
    icon: "🏪",
    questions: [
      {
        question: "كيف يمكنني المشاركة كبائع في كل يوم؟",
        answer: "للمشاركة كبائع، يرجى التسجيل في حساب البائع الخاص بنا وتقديم المعلومات اللازمة عن منتجاتك. سيقوم فريقنا بمراجعة طلبك والتواصل معك لمزيد من التفاصيل."
      },
      {
        question: "ما هي الرسوم المفروضة على البائعين؟",
        answer: "تختلف الرسوم حسب فئة المنتج وحجم المبيعات. نحن نقدم هيكل رسوم تنافسي يضمن فائدة لكل من البائعين والمشترين. يمكنك الاطلاع على التفاصيل الكاملة في صفحة 'شروط البائع'."
      },
      {
        question: "هل يمكنني اختيار اليوم الذي أعرض فيه منتجاتي؟",
        answer: "نحن نحدد جدول الفئات، ولكننا نرحب باقتراحات البائعين. يمكنك التواصل مع مدير الحساب الخاص بك لمناقشة الأيام المفضلة لديك لعرض منتجاتك."
      },
      {
        question: "كيف يتم التعامل مع الشحن والمرتجعات كبائع؟",
        answer: "نوفر خيارات متعددة للشحن، بما في ذلك استخدام خدمة الشحن الخاصة بنا أو خدمة الشحن الخاصة بك. بالنسبة للمرتجعات، لدينا سياسة موحدة تضمن عملية سلسة لكل من البائعين والمشترين."
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-red-800"
        >
          استكشف عالم كل يوم
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
            className="w-full p-4 pr-12 text-lg rounded-full border-2 border-red-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400" />
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
              <div className="bg-red-600 text-white p-4 flex items-center">
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