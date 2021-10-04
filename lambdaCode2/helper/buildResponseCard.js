module.exports.buildResponseCard =  function (title, subTitle, options,imageUrl) {
      let buttons = null;
      if (options != null) {
          buttons = [];
          for (let i = 0; i < Math.min(5, options.length); i++) {
              buttons.push(options[i]);
          }
      }
      return {
          contentType: 'application/vnd.amazonaws.card.generic',
          version: 1,
          genericAttachments: [{
              title,
              subTitle,
              imageUrl,
              buttons
          }],
      };
  }
