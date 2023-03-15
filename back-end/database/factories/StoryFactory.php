<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StoryFactory extends Factory
{
    /**
     * Define the model's default state.
     * Database\Factories\StoryFactory
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, 10),
            'title' => $this->faker->sentence(),
            'views' => rand(1, 200),
            'body' => $this->faker->text(1000),
            'location' => $this->faker->country(),
            'image' => $this->faker->imageUrl(),
            'category_id' => rand(1, 10)
        ];
    }
}