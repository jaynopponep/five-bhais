"use server";

export async function fetchReviews() {
  // TODO: get req /get-reviews endpoint when its implemented (rn its dummy)
  try {
    const review1 = {
      rating: 5,
      date: "4/13/2024",
      text: "Excellent staff, service, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days ace, and food! Was in town for a few days and had a great meal and great conversation. Highly recommend!",
      author: "John D.",
    };
    const review2 = {
      rating: 4,
      date: "4/14/2024",
      text: "The food was amazing! The service was great. I would definitely come back.",
      author: "Jane S.",
    };
    const review3 = {
      rating: 3,
      date: "4/15/2024",
      text: "The food was good, but the service was slow. The staff was friendly though",
      author: "Jack R.",
    };
    const review4 = {
      rating: 5,
      date: "4/16/2024",
      text: "The food was amazing! The service was great. I would definitely come back.",
      author: "Jane S.",
    };
    const review5 = {
      rating: 5,
      date: "4/16/2024",
      text: "The food was amazing! The service was great. I would definitely come back.",
      author: "Jane S.",
    };
    const review6 = {
      rating: 5,
      date: "4/16/2024",
      text: "The food was amazing! The service was great. I would definitely come back.",
      author: "Jane S.",
    };
    const driverReview1 = {
      rating: 2,
      date: "4/22/2024",
      text: "The food was good, but the delivery took a long time. Sam is not a good delivery driver!",
      driver: "Sam R.",
      author: "Will S.",
    };
    const driverReview2 = {
      rating: 2,
      date: "4/22/2024",
      text: "The food was good, but the delivery took a long time. Sam is not a good delivery driver!",
      driver: "Sam R.",
      author: "Will S.",
    };
    const driverReview3 = {
      rating: 2,
      date: "4/22/2024",
      text: "The food was good, but the delivery took a long time. Sam is not a good delivery driver!",
      driver: "Sam R.",
      author: "Will S.",
    };
    const reviews = [
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      driverReview1,
      driverReview2,
      driverReview3,
    ];
    const driverReviews = reviews.filter((review) => review.driver);
    const customerReviews = reviews.filter((review) => !review.driver);
    return [customerReviews, driverReviews];
  } catch (error) {
    throw error;
  }
}