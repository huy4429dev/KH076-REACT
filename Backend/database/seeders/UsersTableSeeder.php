<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Arr;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = Role::pluck('id');
        User::factory()->has(Profile::factory())->count(1000)->create()->each(function ($user) use ($roles)
        {
            $user->roles()->attach(
                $roles->random(rand(1,count($roles)))
            );
        });
    }
}
