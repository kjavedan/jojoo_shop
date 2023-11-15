<template>
  <div class="faq">
    <h1>Frequently Asked Questions (FAQ)</h1>
    <Br />
    <section>
      <h2>General Questions</h2>
      <faq-item
        question="What products do you offer?"
        answer="We offer a wide range of products, including electronics, fashion, home goods, and more. Explore our website to discover our full catalog."
      ></faq-item>

      <faq-item
        question="How can I place an order?"
        answer="To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your order securely."
      ></faq-item>

      <!-- Add more general questions and answers as needed -->
    </section>

    <section>
      <h2>Shipping and Delivery</h2>
      <faq-item
        question="Do you offer international shipping?"
        answer="Yes, we offer international shipping. Please check our shipping policies for more details on delivery locations and timelines."
      ></faq-item>

      <faq-item
        question="How can I track my order?"
        answer="Once your order is shipped, you will receive a tracking number. You can use this number to track your order through our website or the shipping carrier's platform."
      ></faq-item>

      <!-- Add more shipping and delivery questions and answers as needed -->
    </section>

    <section>
      <h2>Payments and Security</h2>
      <faq-item
        question="What payment methods do you accept?"
        answer="We accept a variety of payment methods, including credit cards, debit cards, and Iranian traditional methods. Check our payment options during the checkout process."
      ></faq-item>

      <faq-item
        question="Is my payment information secure?"
        answer="Yes, we take the security of your payment information seriously. Our website uses industry-standard encryption to protect your data during transactions."
      ></faq-item>

      <!-- Add more payments and security questions and answers as needed -->
    </section>
  </div>
</template>

<script setup>
import FaqItem from '@/components/FaqItem.vue' // Import the FaqItem component

// Add any necessary logic or imports here
</script>

<style scoped>
.faq {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 0.5rem;
  /* font-size: 2rem; */
}

section {
  margin-bottom: 30px;
}
</style>
