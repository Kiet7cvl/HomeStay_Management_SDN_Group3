const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name can not be blank'
        },
        avatar: {
            type: String,
        },
        description: {
            type: String,
        },
        menu_id: {type: String, required: 'menu_id can not be blank'},
        article_content: {
            type: String,
        },
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        }
    },
    { timestamps: true},
    { collection: 'articles' }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
