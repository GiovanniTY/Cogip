<?php 
    // require_once '../models/datas.php';
    require_once '../config/dbconnect.php';

    class DataController {
        private $db;
        private $data;
    
        public function __construct($db) {
            $this->db = $db;
            $this->data = new Datas($db);
        }
    
        public function getAllDatasUsers() {
            $stmt = $this->data->read();
            $num = $stmt->rowCount();
        
            if ($num > 0) {
                $datas_arr = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $data_item = [
                        'id' => $id,
                        'first_name' => $first_name,
                        'role_id' => $role_id,
                        'email' => $email,
                        'password' => $password,
                        'created_at' => $created_at,
                        'updated_at' => $updated_at

                    ];
                    array_push($datas_arr, $data_item);
                }
                echo json_encode($datas_arr);
            } else {
                echo json_encode(['message' => 'Aucun post trouvé']);
            }
        }
    
        // Récupérer un post par ID
        public function getDataById($id) {
            $this->data->read_single($id);
    
            if ($this->data->id) {
                $post_item = [
                    'id' => $this->data->id,
                    'title' => $this->data->title,
                    'body' => $this->data->body,
                    'author' => $this->data->author,
                    'created_at' => $this->data->created_at,
                    'updated_at' => $this->data->updated_at
                ];
                echo json_encode(['status' => 200, 'message' => 'OK', 'data' => $post_item]);
            } else {
                echo json_encode(['status' => 404, 'message' => 'Post non trouvé']);
            }
        }
    }


        // $query = "SELECT * FROM  `users`";
        // $array = $connect->query($query);
        // $array->fetchAll(PDO::FETCH_ASSOC);
        // print_r($array);
        // $query = "SELECT * FROM  `users`";
        // $stmt = $connect->prepare($query);
        // $stmt->execute();
        // $stmt->fetchAll(PDO::FETCH_ASSOC);
        // var_dump($stmt);
        
        
