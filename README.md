# 🗂️ Kanban Board with Real‑Time Chat & Mentions

A full‑stack **Kanban Board application** with **task/ticket management** and **real‑time chat inside each ticket**, including **@mentions**, built to mimic real‑world tools like Jira / Trello + Slack.

---

## 🚀 Features

### 📌 Kanban Board

* Create, update, delete tickets
* Drag & drop tickets between columns (Todo / In Progress / Done)
* Ticket status management
* Priority & assignee support

### 💬 Ticket‑Level Chat

* Real‑time chat inside each ticket
* @mention users in messages
* Chat history preserved per ticket
* User‑based message ownership

### 👥 User & Auth

* JWT‑based authentication
* Role‑based access (Admin / User)
* User mentions auto‑suggest

### ✏️ Task Management

* Add / Edit / Delete tasks
* Assign tasks to users
* Track task status changes

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Material UI (MUI)
* Drag & Drop (react‑beautiful‑dnd / dnd‑kit)
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.io
* JWT Authentication

---

## 📂 Project Structure

```
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── redux/
 │   ├── services/
 │   └── utils/

server/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── socket/
 └── middleware/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/kanban-board-chat.git
```

### 2️⃣ Install Dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd server
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in **server/**

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

### 4️⃣ Run Application

**Backend**

```bash
npm run dev
```

**Frontend**

```bash
npm run dev
```

---

## 🔄 Real‑Time Chat Flow

1. User opens ticket
2. Socket connection established
3. Messages synced instantly
4. Mentions notify tagged users

---

## 🧪 API Highlights

* `POST /api/auth/login`
* `POST /api/tickets`
* `PUT /api/tickets/:id`
* `DELETE /api/tickets/:id`
* `GET /api/chat/:ticketId`


## 🧠 Learning Outcomes

* Real‑time systems with Socket.io
* Scalable task management architecture
* Clean React + Redux patterns
* MongoDB schema design for chat systems

---

## 📌 Future Enhancements

* Notifications panel
* File uploads in chat
* Activity logs
* Search & filters

---

## 👨‍💻 Author

**Koyna Khare**
Full‑Stack Developer (React + Node.js)
