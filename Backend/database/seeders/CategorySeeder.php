<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CategorySeeder extends Seeder
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
                'name' => 'category 1',
                'description' => 'category description 1',
                'parent_id' => null,
            ],
            [
                'name' => 'category 1.1',
                'description' => 'category description 1.1',
                'parent_id' => 1,
            ],
            [
                'name' => 'category 1.2',
                'description' => 'category description 1.2',
                'parent_id' => 1,
            ],
            [
                'name' => 'category 2',
                'description' => 'category description 2',
                'parent_id' => null,
            ],
            [
                'name' => 'category 3',
                'description' => 'category description 3',
                'parent_id' => null,
            ],
            [
                'name' => 'category 4',
                'description' => 'category description 4',
                'parent_id' => null,
            ],
            [
                'name' => 'category 5',
                'description' => 'category description 5',
                'parent_id' => null,
            ],
            [
                'name' => 'category 5.1',
                'description' => 'category description 5.1',
                'parent_id' => 7,
            ],
            [
                'name' => 'category 5.2',
                'description' => 'category description 5.2',
                'parent_id' => 7,
            ],
            [
                'name' => 'category 5.3',
                'description' => 'category description 5.3',
                'parent_id' => 7,
            ],
        ];

        foreach($data as $item) {
            
            DB::table('categories')->insert([
                'name' => $item['name'],
                'description' => $item['description'],
                'parent_id' => $item['parent_id'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
