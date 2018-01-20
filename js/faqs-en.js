var app = new Vue({
    el: '#app',
    data: {
        title: "Frequently Asked Questions",
        description: "The most common questions and answers about our accounting software",
        questions: [
            {
                id: 'what',
                title: 'What kind of software is myAbakus?',
                answer: [
                        //answer 1.1
                        'myAbakus is a simple accounting software for non-accountants. Said in different way, myAbakus is a administrative and financial software designed for you and your business, not your accountant. This means that with myAbakus you will get the critical and essential functionality of a traditional accounting software (invoicing, accounts receivable, cash control, cash flow management), but without its complexity (see next question). Not interested or familiarized with the double-entry bookkeeping system? myAbakus will take care of implementing it without you even knowing.'
                    ]
            },
            {
                id: '',
                title: 'Is myAbakus a traditional accounting software?',
                answer: [

                        "No. Traditional accounting software is usually too complex, require specialized accounting knowledge and have too much emphasis on fiscal compliance. The latter is usually a strength of traditional accounting software and without any doubt very important, but can also complicate them to the point that they loose their usefulness as a management tool for those who need clear and up-to-date information to make decisions."
                    ,

                        "If you have an external accountant that demands that you use an accounting software that only him is capable of understanding and/or doesn’t give you useful and up-to-date information about your business, we recommend you change accountant. If you accountant is open minded enough to consider that you use myAbakus, but have doubts, questions or suggestions, we’ll be more than happy to review them with your or him/her directly."
                    ,

                        "That myAbakus is accounting software for non-accountants doesn’t mean we are trying to antagonize accountants. In fact, we have been working hard on the tax management features and reports to facilitate the accountant’s work. And we are committed to continue working on this area, but always adhering to our philosophy that accounting must be more a management tool than something done to comply with fiscal norms."

                    ]
            },
            {
                id: 'why',
                title: 'Why use myAbakus? Who is it for?',
                answer: [

                        "Because understanding and controlling its finances is important for the survival and growth of your business. And because given the personal effort required to start a business and keep it going, you need to know how much of a profit it is really making you (or not)."

                    ,

                        "In theory, any person, business or entity interested in keeping its accounts in order and up-to-date can use myAbakus: entrepreneurs, small businesses, freelancers and non-profits. But the common trait myAbakus clients seem to have is a strong desire to be on top of their business finances themselves and on a day-to-day basis."
                    ,

                        "If you don't feel that way or believe that should be the accountants job, myAbakus might not be the right product for you."

                        ]
            },
            {
                id: 'trial',
                title: 'How does the free trial work?',
                answer: [

                        "The trial period lasts for 14 days during which you can evaluate the software without any restriction, so that you can see how it fits the needs of your business and determine which functionality is relevant for you."
                    ,

                        "And keep in mind that during this period you will receive the same personalized service we provide to our customers. Which means that you will have access to a person responsible for helping with the implementation and ensuring that myAbakus becomes a valuable tool for your business."

                    ]
            },
            {
                id: 'cost',
                title: 'How much is it going to cost?',
                answer: [

                        'The cost depends on what you choose in your plan (and how often you pay) and starts at U$ 14.90 a month if you pay six months in advance. You can review the different payment options by clicking on "Your Account" within the application.',

                    ,

                        "Please keep in mind, however, that cost is irrelevant without context. What you really want is a good return on your investment. In other words, you want the value created by myAbakus to be greater than its cost."
                    ,

                        "The free trial gives your a proper chance to evaluate our software and get a sense of how much value it could generate for your business before subscribing (see previous question). But because you will only know for sure by using it regularly for sufficient time, we also offer a satisfaction guarantee (see next question)."

                        ]
            },
            {
                id: 'guarantee',
                title: 'What is the satisfaction guarantee?',
                answer: [

                        "We naturally believe myAbakus is a good investment. If used regularly, we are confident that the value it will generate for your business will be greater for its cost. And we are prepared to back up this claim with a 90-day satisfaction guarantee."
                    ,

                        "Say you have properly evaluated myAbakus and feels it could be a good investment for your business (see previous question). You can now subscribe confidently knowing that for the following 90-days you are entitled to get all your money back if after using it regularly (at least 3 days per week), you feel myAbakus not generating enough value for your business relative to its cost."

                        ]
            },
            {
                id: 'country',
                title: 'Will myAbakus work in my country?',
                answer: [

                        "We strongly believe it will. We designed myAbakus following business principles that are universal. We believe this makes myAbakus simpler and easier than traditional accounting software that is suppose to deal every local regulatory aspect. Remember that myAbakus was designed to help you run your business, not please your accountant. But also keep in mind that myAbakus can handle local tax issues (like VAT) and that granting access to your accountant will make his/her work easier. And if you think myAbakus is lacking something needed in your regulatory environment, please let us know to see if we can correct it."

                        ]
            },
            {
                id: '',
                title: 'Can I export my information out of myAbakus?',
                answer: [

                        "Yes. You can export your data from myAbakus in a spreadsheet format (CSV), which is readable by most systems with data import capabilities."
                        ]
            },
            {
                id: '',
                title: 'How do you keep my information safe?',
                answer: [

                        "Nowadays your information is safer stored in the cloud that in your personal computer. Your login information is encrypted using the same technology that financial institutions rely on for online banking. And you have a team of software and hardware administrators behind you whose job is to keep thing running smoothly and to make sure your information is always protected, which includes making daily data backups."

                        ]
            },
            {
                id: 'pay',
                title: 'When I’m ready to subscribe, how can I pay?',
                answer: [

                    "You can pay the subscription using a credit card or a debit card that is accepted on the same network (usually those with a 3-digit security code to the right of signature strip).",

                'To process the payment we use <a href="https://stripe.com">Stripe</a>, an online payments company that&nbsp;focuses on providing the technical, fraud prevention, and banking infrastructure required to operate online payment systems.',

                'For security reasons we do not have access to your payment information and you can stop your payment instruction anytime by simply canceling your myAbakus subscription.',

                'If you do not own or have access to a credit card, please contact us so that we can give you the information you need to send the payment using WesternUnion.'

                ]
            },
            {
                id: 'card',
                title: 'How do you make sure my credit card information is safe?',
                answer: [

                        'You credit card information is safe with <a href="https://stripe.com/us/features#seamless-security">Stripe</a>, a San Francisco based company founded in 2011 and backed by some of the most prominent investors in Silicon Valley. Stripe might be relatively new in the payment processing industry, but it has been growing rapidly by focusing on delivering a payment infrastructure for the internet that enable business to accept and manage online payments. Naturally, their success is based on using robust and secure technology that complies with the most stringent levels of security certification in the industry.'

                ]
            },
            {
                id: 'change',
                title: 'What happens if I change my plan after I have paid?',
                answer: [

                        'The billing cycle starts the day you subscribe. That day you will be charged 1 month, 6 months or 12 months in advance based on your selection. If you decide to change your plan in the middle of the billing cycle, you will start a new 1 month, 6 months or 12 months cycle that day.'
                    ,

                        'And the unused portion of the previous plan becomes a credit for subsequent charges. So if, for example, 20 days into your 30 day billing cycle, you add features to your your plan, the 10 unused (but paid) days will be deducted from the cost of the new plan.'

                ]
            },
            {
                id: 'cancel',
                title: "What happens if I don't renew my subscription?",
                answer: [

                        'You will not be charged again and when your subscription expires, you will not able to enter more transactions. But you will have access to your account and all the information you have entered. We will not delete your account nor your data unless you instruct us to do so by canceling your account.'

                ]
            }
        ]

    }

});
