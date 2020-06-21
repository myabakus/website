var app = new Vue({
    el: '#app',
    data: {
        title: "Preguntas Frecuentes",
        description: "Las preguntas y respuestas más comunes sobre nuestro software contable",
        questions: [
            {
                id: 'que',
                title: '¿Qué tipo de software es myAbakus?',
                answer: [
                        //answer 1.1
                        'myAbakus es un software contable simple para no contadores. Dicho de otra forma, myAbakus es un software administrativo y de gestión financiera diseñando para usted y su negocio, no para su contador. Eso quiere decir que con myAbakus usted va a tener la funcionalidad básica y esencial de un software contable tradicional (facturación, cuentas por cobrar, control de efectivo, manejo de flujo de caja, control de inventario, y rentabilidad), pero sin la complejidad del mismo (ver siguiente pregunta). ¿No está familiarizado o interesado en cómo funciona el sistema de partida doble? myAbakus se encarga de implementarlo sin que usted tenga ni que enterarse.'
                    ],
                order: '1',
            },
            {
                id: '',
                title: '¿Es myAbakus un software de contabilidad tradicional?',
                answer: [

                        "No. Los softwares de contabilidad tradicional son muy complejos, requieren conocimientos contables especializados y tienen qué hacer énfasis en la parte fiscal y de cumplimiento de normas. Eso los hace muy buenos para esto último, pero muy malos como herramienta de gestión, pues terminan siendo de poca utilidad para quienes necesitan información clara y al día para tomar decisiones."
                    ,

                        "Si usted tiene un contador externo que exige qué usted use un software contable que sólo él es capaz de manejar y/o no le brinda información útil y al día sobre su negocio, le recomendamos que cambie de contador. Si su contador es de mente abierta y está dispuesto a considerar que usted use myAbakus, pero tiene dudas, inquietudes o sugerencias, con el mayor gusto se las resolvemos a usted o a él/ella directamente."
                    ,

                        "Que myAbakus sea un software contable para no contadores, no quiere decir que estemos de pelea con ellos. De hecho, hemos hecho un trabajo importante en materia de impuestos y sus correspondientes reportes, para facilitar el trabajo del contador. Y estamos comprometidos a seguir haciendo mejoras en esta área, pero siempre respetando nuestra filosofía de que la contabilidad debe ser más una herramienta de gestión que un instrumento para cumplir con normas fiscales."

                    ],
                order: '2',
            },
            {
                id: 'por-que',
                title: '¿Por qué usar myAbakus? ¿Para quién es?',
                answer: [


                        "Por qué entender y controlar las finanzas de su negocio es importante para la supervivencia y el crecimiento del mismo. Y por qué dado el sacrificio personal requerido para arrancar y mantener un negocio, usted necesita tener certeza de si está (o no) generando una ganancia adecuada."

                    ,

                        "En teoría cualquier persona, negocio o entidad interesada en tener sus cuentas en orden y al día puede usar myAbakus: emprendedores, Pymes, profesionales independientes y organizaciones sin ánimo de lucro. Pero lo qué suelen tener en común los clientes de myAbakus es querer tener control de las cuentas de sus negocios diariamente y sin depender de nadie."
                    ,

                        "Si esto no es lo qué usted busca o le parece qué eso debería ser el trabajo del contador, tal vez myAbakus no sea el producto adecuado para usted."

                        ],
                    order: '3',
            },
            {
                id: 'prueba',
                title: '¿Cómo funciona el periodo de prueba?',
                answer: [

                        "El periodo de prueba tiene una duración de 7 días durante los cuales usted podrá evaluar el software sin ninguna restricción, para que pueda ver cómo se adapta a las necesidades de su negocio y determinar que funcionalidad es relevante para usted."
                    ,

                        "Tenga presente que puede extenderlo a 14 días con tan solo verificar su email y que durante este periodo usted va a recibir el mismo nivel de servicio que le brindamos a nuestros clientes si nos solicita ayuda."

                    ],
                order: '4',
            },
            {
                id: 'costo',
                title: '¿Cuánto va a costar?',
                answer: [

                        "El costo depende del plan y los extras que seleccione y la frecuencia con qué pague y comienza en U$29 al mes. Para ver las diferentes opciones revise la página de configuración de la cuenta.",

                    ,

                        "No obstante, tenga presente que el costo es irrelevante fuera de contexto. Lo que usted realmente quiere es un buen retorno sobre su inversión. En otras palabras, usted quiere que el valor que le genera myAbakus sea mayor que su costo."
                    ,

                        "El periodo de prueba le da la oportunidad de evaluar nuestro software y darse una idea de cuanto valor puede generar para su negocio antes de suscribirse (ver pregunta anterior). Pero como sólo va a saberlo con certeza usándolo regularmente por suficiente tiempo, también ofrecemos una garantía de satisfacción después de suscribirse (ver siguiente pregunta)."

                        ],
                    order: '5',
            },
            {
                id: 'garantia',
                title: '¿Cómo funciona la garantía de satisfacción?',
                answer: [

                        "Naturalmente, nosotros pensamos que myAbakus es una buena inversión. Si se usa regularmente, estamos seguros de que el valor que va a generarle a su empresa va a ser mayor que su costo. Y por lo tanto, estamos preparados a ofrecer con una garantía de satisfacción que cubre los primeros 90 días de su suscripción y devuelve el 120% de su pago."
                    ,

                        "Cuando termine su periodo de prueba, usted puede suscribirse con la tranquilidad de saber que puede solicitar la devolución del 120% de su pago, como compensación por su tiempo y esfuerzo, si después de haber usado el software regularmente (al menos 3 veces a la semana) por 90 días, usted no esta satisfecho con el valor que le está generando a su empresa."

                        ],
                    order: '6',
            },
            {
                id: 'pais',
                title: '¿myAbakus va a funcionar en mi país?',
                answer: [

                        "Creemos firmemente que si. Diseñamos myAbakus siguiendo principios de negocios que son universales y creemos que esto hace qué sea más simple y fácil de usar que software contable tradicional que debe manejar cada aspecto de regulación local. Recuerde que myAbakus fue diseñado para ayudarle a manejar su negocio, no para complacer a su contador. Pero también tenga presente que myAbakus puede manejar aspectos tributarios locales (como el IVA) y que darle acceso a su contador va a hacer mas fácil su trabajo. Y si usted piensa qué myAbakus le falta necesario en su marco regulatorio, por favor déjenoslo saber para ver si podemos corregirlo."

                        ],
                    order: '7',
            },
            {
                id: '',
                title: '¿Puedo exportar mi información fuera de myAbakus?',
                answer: [

                        "Si. Usted puede exportar su información de myAbakus en un formato compatible con hoja de cálculo (CSV), el cual es compatible con la mayoría de sistemas que tienen capacidad de importar información."

                        ],
                    order: '8',
            },
            {
                id: '',
                title: '¿Cómo mantienen mi información segura?',
                answer: [

                        "Hoy en día su información está más segura en la nube que un su computador personal. Su información de acceso se encripta usando la misma tecnología que las instituciones financieras usan para banca en línea. Y usted tiene un equipo de administradores de software y hardware detrás suyo cuyo trabajo es mantener todo operando correctamente y asegurarse que su información siempre esté protegida, incluyendo backups diarios de los datos."

                        ],
                    order: '9',
            },
            {
                id: 'pago',
                title: 'Cuándo esté listo para suscribirme, ¿cómo puedo pagar?',
                answer: [

                    "Usted puede pagar la suscripción usando una tarjeta de crédito o una tarjeta débito que sea aceptada en la misma red (usualmente aquellas con un código de seguridad de 3 dígitos al lado derecho de la banda con la firma).",

                'Para procesar el pago usamos <a href="https://stripe.com">Stripe</a>, una empresa de pagos en línea que se especializa en proveer la infraestructura técnica, de prevención de fraude y bancaria que se necesita para poder operar sistemas de pago en línea.',

                'Si usted todavía no tiene una cuenta con ellos, automáticamente le van a crear una cuando ingrese la información para el pago.',

                'Por razones de seguridad nosotros no tenemos acceso a su información de pago y usted podrá suspender la instrucción de pago en cualquier momento con simplemente cancelar su suscripción a myAbakus.',

                'Si usted no tiene acceso a ningún tipo de tarjeta, por favor póngase en contacto con nosotros para enviarle la información que necesita para enviar el pago a través de WesternUnion.'

                ],
            order: '10',
            },
            {
                id: 'tarjeta',
                title: '¿Cómo se que la información de mi tarjeta de crédito está segura?',
                answer: [

                        'Su información de tarjeta de crédito está segura con <a href="https://stripe.com/us/features#seamless-security">Stripe</a>, una empresa con sede en San Francisco y fundada en el 2011 con el respaldo de algunos de los inversionistas más destacados en Silicon Valley. Stripe es una empresa relativamente nueva en la industria de procesamiento de pagos, pero ha crecido rápidamente gracias a su enfoque en proveer una infraestructura de pagos para internet que le permite a empresas aceptar y manejar pagos en línea. Naturalmente, su éxito se basa en el uso de tecnologías robustas y seguras que cumplen con las certificaciones de seguridad más estrictas de la industria.'

                ],
            order: '11',
            },
            {
                id: 'cambio',
                title: '¿Qué pasa si cambio mi plan o cancelo después de haber pagado?',
                answer: [

                        'El periodo de facturación comienza el día que usted se suscribe. Ese día se le cobrará 1 mes, 6 meses o 12 meses por anticipado de acuerdo con su selección. Si usted decide cambiar su plan en la mitad del ciclo de facturación, ese día comenzará un nuevo ciclo de 1 mes, 6 meses o 12 meses.'
                    ,

                        'Y la porción no usada de su plan anterior se vuelve un crédito para pagos futuros. Si, por ejemplo, 20 días dentro de su periodo de facturación de 30 días usted decide agregar funcionalidad a su plan, los 10 días no usados (pero pagados) se restan del costo del nuevo plan.'

                ],
            order: '12',
            },
            {
                id: 'cancelacion',
                title: '¿Qué pasa si no renuevo mi suscripción?',
                answer: [

                        'No se le harán más cargos a su tarjeta y cuando su suscripción expire, no podrá ingresar más transacciones. Pero mantendrá acceso a su cuenta y a toda la información que haya ingresado. No vamos a borrar su cuenta ni sus datos a menos que nos de instrucciones de hacerlo cancelando su cuenta.'

                ],
            order: '13',
            }
        ]

    },
    mounted (h) {
        const hash = location.hash;
        if (hash) {
            const element = this.$el.querySelector('a[href="' + hash + '"]');
            if (element !== null) {
                setTimeout(function () {
                    element.click();
                }, 10);
            }
        }
    }
});
