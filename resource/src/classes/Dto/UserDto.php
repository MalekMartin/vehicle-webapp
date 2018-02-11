<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 28. 5. 2017
 * Time: 7:16
 */

class UserDto {

    public $id;
    public $firstName;
    public $lastName;

    /**
     * UserDto constructor.
     * @param $u array of data
     */
    public function __construct(array $u) {
        if (isset($u['id'])) {
            $this->id = $u['id'];
        }
        $this->firstName = $u['firstName'];
        $this->lastName = $u['lastName'];
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }


}