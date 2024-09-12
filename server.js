const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Op } = require('sequelize');
const User = require('./models/User');
const Event = require('./models/Event');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Set up multer for image uploads
const upload = multer({ dest: 'public/images/' });

app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, brief } = req.body;

    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email or phone number already exists.' });
    }

    // Create the new user if no existing user was found
    const user = await User.create({ name, email, phone, password, brief });
    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrPhone },
          { phone: emailOrPhone }
        ],
        password
      }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/create-event', upload.fields([{ name: 'coverImage' }, { name: 'additionalImage1' }, { name: 'additionalImage2' }, { name: 'additionalImage3' }]), async (req, res) => {
  try {
    const { name, description, country, subCategory, date, startTime, endTime, venueName, venueAddress, ticketPrice, capacity } = req.body;

    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].filename : null;
    const additionalImage1 = req.files['additionalImage1'] ? req.files['additionalImage1'][0].filename : null;
    const additionalImage2 = req.files['additionalImage2'] ? req.files['additionalImage2'][0].filename : null;
    const additionalImage3 = req.files['additionalImage3'] ? req.files['additionalImage3'][0].filename : null;

    const event = await Event.create({
      name,
      description,
      country,
      subCategory,
      date,
      startTime,
      endTime,
      venueName,
      venueAddress,
      ticketPrice,
      capacity,
      coverImage,
      additionalImage1,
      additionalImage2,
      additionalImage3
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/event/:id', upload.fields([
  { name: 'coverImage' },
  { name: 'additionalImage1' },
  { name: 'additionalImage2' },
  { name: 'additionalImage3' }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, country, subCategory, date, startTime, endTime, venueName, venueAddress, ticketPrice, capacity } = req.body;

    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].filename : null;
    const additionalImage1 = req.files['additionalImage1'] ? req.files['additionalImage1'][0].filename : null;
    const additionalImage2 = req.files['additionalImage2'] ? req.files['additionalImage2'][0].filename : null;
    const additionalImage3 = req.files['additionalImage3'] ? req.files['additionalImage3'][0].filename : null;

    console.log(req.params);
    console.log(req.body);

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updatedEvent = await Event.update({
      name: name || event.name,
      description: description || event.description,
      country: country || event.country,
      subCategory: subCategory || event.subCategory,
      date: date || event.date,
      startTime: startTime || event.startTime,
      endTime: endTime || event.endTime,
      venueName: venueName || event.venueName,
      venueAddress: venueAddress || event.venueAddress,
      ticketPrice: ticketPrice || event.ticketPrice,
      capacity: capacity || event.capacity,
      coverImage: coverImage || event.coverImage,
      additionalImage1: additionalImage1 || event.additionalImage1,
      additionalImage2: additionalImage2 || event.additionalImage2,
      additionalImage3: additionalImage3 || event.additionalImage3
    }, { where: { id } });

    if (updatedEvent[0] === 1) { // [0] is the number of affected rows
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/events', async (req, res) => {
  try {
    const { name, description, capacity, country, venueName, venueAddress, ticketPrice, isFreeTicket, subCategory, date, startTime, endTime } = req.query;

    const where = {};

    if (country) where.country = country;
    if (venueName) where.venueName = venueName;
    if (venueAddress) where.venueAddress = venueAddress;

    if (isFreeTicket === 'true') {
      where.ticketPrice = '0';
    } else if (ticketPrice) {
      where.ticketPrice = {
        [Op.lte]: ticketPrice
      };
    }

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`  // Use LIKE with wildcards
      };
    }

    if (description) where.description = description;
    if (subCategory) where.subCategory = subCategory;
    if (date) where.date = new Date(date);
    if (startTime) where.startTime = startTime;
    if (endTime) where.endTime = endTime;
    if (capacity) {
      where.capacity = {
        [Op.gte]: Number(capacity)
      };
    }

    const events = await Event.findAll({ where });

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/event/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an event by ID
app.delete('/event/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (event) {
      await event.destroy();
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Sync database
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
