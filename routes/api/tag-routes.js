const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async function(req, res) {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    if (tagData.length == 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    //console.log(tagData)
    res.json(tagData);
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async function(req, res) {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    if (tagData.length == 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(tagData);
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async function(req, res) {
  try {
    let tagData = await Tag.create({
      tag_name: req.body.tag_name
    })
    //console.log(tagData);
    res.json(tagData)
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async function(req, res) {
  // update a tag's name by its `id` value
  try {
    let tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (tagData.length == 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(tagData);
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async function(req, res) {
  // delete on tag by its `id` value
  try {
    let tagData = await Tag.findOne({
      where: {
        id: req.params.id
      }
    })
    if (tagData) {
      await tagData.destroy();
    }
    if (!tagData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(tagData);

  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;