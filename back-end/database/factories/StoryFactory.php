<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

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
            // 'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'views' => rand(1, 100),
            'body' => $this->faker->text(1000),
            'location' => $this->faker->country(),
        ];
    }
}