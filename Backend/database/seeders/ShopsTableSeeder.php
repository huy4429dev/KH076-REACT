<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    
    public function run()
    {
        $data = [
            [
                'name' => 'shop  1',
                'description' => 'shop  description 1',
                'status' => true
            ],
            [
                'name' => 'shop  1.1',
                'description' => 'shop  description 1.1',
                'status' => true
            ],
            [
                'name' => 'shop  1.2',
                'description' => 'shop  description 1.2',
                'status' => true
            ],
            [
                'name' => 'shop  2',
                'description' => 'shop  description 2',
                'status' => true
            ],
            [
                'name' => 'shop  3',
                'description' => 'shop  description 3',
                'status' => true
            ]
           ];

            
        foreach($data as $item) {
            
            DB::table('shops')->insert([
                'name' => $item['name'],
                'description' => $item['description'],
                'status' => $item['status'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $data = [
            [
                "email" => "shoptest1@gmail.com",
                "username" => "shoptest1",
                "password" => bcrypt("123456"),
            ],
            [
                "email" => "shoptest2@gmail.com",
                "username" => "shoptest2",
                "password" => bcrypt("123456"),
            ],
            [
                "email" => "shoptest3@gmail.com",
                "username" => "shoptest3",
                "password" => bcrypt("123456"),
            ]
       
           ];

           DB::table('users')->insert([
            'username' => $item['username'],
            'email' => $item['email'],
            'password' => $item['password'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

    }
}
