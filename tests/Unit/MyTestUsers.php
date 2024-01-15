<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;


class MyTestUsers extends TestCase
{
    /**
     * when we're making a request to a route that is protected 
     * by Sanctum's authentication middleware (auth:sanctum), 
     * need to simulate an authenticated user to access 
     * that route successfully
     */
    use RefreshDatabase; // koga koristma refreshDatabase se refresira bazata i gi brise podatocite


    public function testUserIndex()
    {
        
        // Create a user
        $user = User::factory()->create();

        // Authenticate as the user
        $this->actingAs($user);

        // new users for testing
        User::factory(20)->create();

        // Index request
        $response = $this->get(route('users.index'));

        // Assertions
        $response->assertStatus(200); // 200 for successful request

        // Check if the response format is as expected
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'email',
                ]
            ],
            'links' => [
                'first',
                'last',
                'prev',
                'next',
            ],
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'path',
                'per_page',
                'to',
                'total',
            ]
        ]);

        dd($response);

    }
    

     /**
     * POST api/users  users.store › UserController@store
     */
    public function testUserCreationStore()
    {

        // mora da kreiram random user da bide avtenticiran
        $user = User::factory()->create([
            'name' => 'Jolie Doe',
            'email' => 'joliee@example.com',
            'password' => bcrypt('password123'),
        ]);

       

        $response = $this->actingAs($user)->post(route('users.store'), [
            'name' => 'Random Name',
            'email' => 'randomm@yahoo.com',
            'password' => 'asd123asd',
            'password_confirmation' => 'asd123asd', // must  password confirmation
        ]);

        dd($response);

       

        // assertions to check if the user was created successfully
        // 302 for redirects
        $response->assertStatus($response->status(), 201); 
    }

    public function testUserUpdate()
    {
        // Create a user
        $user = User::factory()->create([
            'name' => 'new John Doe',
            'email' => 'newjohn@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Authenticate as the user
        $this->actingAs($user);

        // update request
        $updatedName = 'Updated Name';
        $response = $this->put(route('users.update', ['user' => $user->id]), [
            'name' => $updatedName,
            'email' => 'updated@example.com',
        ]);

        dd($response);

        // Assertions
        // assertStatus go zema od controllerot za update i tamu e 200
        $response->assertStatus(200); // 200 for successful update
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => $updatedName, 'email' => 'updated@example.com']);
    }

    /**
     * DELETE api/users/{user}  users.destroy › UserController@destroy
     */
    public function testUserDestroy()
    {
        // mora da se kreira avtenticiran user oti koristam auth:sanctum paket
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Authenticate as the user
        $this->actingAs($user);

        // Delete request
        $response = $this->delete(route('users.destroy', ['user' => $user->id]));

        // Assertions
        $response->assertStatus(204); // 204 for successful deletion
         
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseCount('users', 0);
    }
}

