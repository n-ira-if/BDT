// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.
import { createConsumer } from "@rails/actioncable"

const consumer = createConsumer()
console.log('Consumer created:', consumer); // デバッグ用のログ

window.App = window.App || {};
App.cable = App.cable || consumer;

export default consumer;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});

