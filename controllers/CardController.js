import CardModel from "../models/Card.js"

export const create = async (req, res) => {
  try {
    const doc = new CardModel({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      imageURL: req.body.imageURL,
      price: req.body.price,
      title: req.body.title,
      user: req.userId,
    })

    const card = await doc.save()

    res.json(card)
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось создать товар",
    })
  }
}

export const update = async (req, res) => {
  try {
    const cardId = req.params.id

    await CardModel.updateOne(
      {
        _id: cardId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        imageURL: req.body.imageURL,
        price: req.body.price,
        title: req.body.title,
        user: req.userId,
      }
    )

    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Не удалось обновить информацию о товаре",
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const cards = await CardModel.find().populate("user").exec()

    res.json(cards)
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось получить товары",
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const cardId = req.params.id

    const doc = await CardModel.findOneAndUpdate(
      {
        _id: cardId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).populate("user")

    if (!doc) {
      return res.status(404).json({
        message: "Товар не найден",
      })
    }

    return res.json(doc)
  } catch (error) {
    return res.status(500).json({
      error: error,
      message: "Не удалось получить товар",
    })
  }
}
