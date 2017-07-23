/**
 * GET /
 * Vue-test page.
 */
exports.index = (req, res) => {
  res.render('vue-test', {
    title: 'Vue-test'
  });
};

/*
app.get('/vue-test', (req, res, next) => {
    res.render('layout', {
        data: {
            otherData: 'Something Else'
        },
        vue: {
            head: {
                title: 'Page Title',
                head: [
                    { property:'og:title', content: 'Page Title'},
                    { name:'twitter:title', content: 'Page Title'},
                ]
            }
        }
    });
})
*/
/*
app.get('/vue-test', function (req, res){
    var scope = {
        data: {
            title: pageTitle,
            message: 'Hello!',
            users: users
        },
        vue: {
            head: {
                title: pageTitle,
                meta: [
                    { property:'og:title', content: pageTitle},
                    { name:'twitter:title', content: pageTitle}
                ],
                structuredData: {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": "http://www.your-company-site.com",
                    "contactPoint": [{
                        "@type": "ContactPoint",
                        "telephone": "+1-401-555-1212",
                        "contactType": "customer service"
                    }]
                }
            },
            components: ['users', 'messageComp'],
            mixins: [exampleMixin]
        }
    };
    res.render('index', scope);
});
*/
