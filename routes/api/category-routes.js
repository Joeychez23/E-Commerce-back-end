const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async function (req, res) {
  // find all categories
  // be sure to include its associated Product
  try {
    let catData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (catData.length == 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Grabs all from employeesDB.role
router.get('/:id', async function (req, res) {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let catData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (catData.length == 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async function (req, res) {
  // create a new category
  try {
    let catData = await Category.create({
      category_name: req.body.category_name
    })
    res.json(catData)
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async function (req, res) {
  // update a category by its `id` value
  try {
    let catData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (catData.length == 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async function (req, res) {
  //delete a category by its `id` value
  try {
    let catData = await Category.findOne({
      where: {
        id: req.params.id
      }
    })
    if (catData) {
      await catData.destroy();
    }
    if (!catData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(catData);

  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;