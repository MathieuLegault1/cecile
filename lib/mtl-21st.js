const _ = require('lodash');
const request = require('request');

let currentMenus = new Promise((resolve, reject) => {
  request('https://www.21stcenturyfood.com/api/meal-delivery/menus/products/current?related=Translations', {
    json: true
  }, (err, res, body) => {
    if (err) {
      reject(err);
    } else {
      let lunchs = _.filter(body, (lunch) =>
        lunch['ProductStatusCd'] == 'A' &&
        lunch['InternalUseOnly'] == 'n'
      )
      resolve(lunchs);
    }
  });
});

let regularProducts = new Promise((resolve, reject) => {
  request('https://www.21stcenturyfood.com/api/products?categories=M&limit=0&related=Translations,Nutrition,ProductTags&types=SN,WR,SD,AP', {
    json: true
  }, (err, res, body) => {
    if (err) {
      reject(err);
    } else {
      let lunchs = _.filter(body, (lunch) =>
        lunch['ProductStatusCd'] == 'A' &&
        lunch['InternalUseOnly'] == 'n'
      )
      resolve(lunchs);
    }
  });
});

Promise.all([currentMenus, regularProducts]).then(lunchs => {
  lunchs = _.flatten(lunchs);
  lunchs = _.map(lunchs, (lunch) => {
    return {
      'id': lunch.Id,
      'type': lunch.ProductTypeCd,
      'name': lunch.Translations.find((t) => t.LanguageCd == 'fr').Title,
      'description': lunch.Translations.find((t) => t.LanguageCd == 'fr').Description
    }
  });

  let obj = {
    'menuWeek': '2017-10-16',
    'deliveries': [{
      'id': 1,
      'title': 'Lundi - Mardi - Mercredi',
      'count': 3
    }, {
      'id': 2,
      'title': 'Jeudi - Vendredi',
      'count': 2
    }],
    'selectionStart': '2017-10-05T00:00:00Z',
    'selectionEnd': '2017-10-11T15:00:00Z',
    'menuCategories': [{
        'id': 1,
        'name': 'Repas cuisinés',
        'menuItems': lunchs.filter((l) => l.type == 'SU').map((lunch, i) => {
          lunch.code = `A${i + 1}`;
          return lunch;
        })
      }, {
        'id': 2,
        'name': 'Sandwichs',
        'menuItems': lunchs.filter((l) => l.type == 'WR').map((lunch, i) => {
          lunch.code = `B${i + 1}`;
          return lunch;
        })
      }, {
        'id': 3,
        'name': 'Salades',
        'menuItems': lunchs.filter((l) => l.type == 'SD').map((lunch, i) => {
          lunch.code = `C${i + 1}`;
          return lunch;
        })
      }

    ]
  };

  console.log(JSON.stringify(obj, null, 4));
});
