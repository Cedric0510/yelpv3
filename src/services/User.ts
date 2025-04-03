import {User} from '../models/User.js';
import UserRepository from '../repositories/User.js';

class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    /**
     * Récupère tous les utilisateurs
     * @returns Liste des utilisateurs
     */
    public async getAllUsers(): Promise<User[]> {
        try {
            return await this.repository.getAll();
        } catch (error) {
            console.error('Service - Error getting all users:', error);
            throw new Error('Échec lors de la récupération des utilisateurs');
        }
    }

    /**
     * Récupère un utilisateur par son ID
     * @param id Identifiant de l'utilisateur
     * @returns Utilisateur ou null si non trouvé
     */
    public async getUserById(id: string): Promise<User | null> {
        if (!id) {
            throw new Error('ID utilisateur requis');
        }

        try {
            return await this.repository.getById(id);
        } catch (error) {
            console.error(`Service - Error getting user with ID ${id}:`, error);
            throw new Error(`Échec lors de la récupération de l'utilisateur avec l'ID ${id}`);
        }
    }

    /**
     * Crée un nouvel utilisateur
     * @param userData Données de l'utilisateur
     * @returns true si l'opération a réussi
     */
    public async createUser(userData: { name: string, role: string, age: number }): Promise<boolean> {
        // Validation des données
        if (!userData.name || !userData.role || !userData.age) {
            throw new Error('Données utilisateur incomplètes');
        }

        // Validation de l'âge
        if (userData.age <= 0 || userData.age > 120) {
            throw new Error('Âge invalide');
        }

        try {
            const newUser = new User(0, userData.name,userData.role, userData.age);
            return await this.repository.create(newUser);
        } catch (error) {
            console.error('Service - Error creating user:', error);
            throw new Error("Échec lors de la création de l'utilisateur");
        }
    }

    /**
     * Supprime un utilisateur
     * @param id Identifiant de l'utilisateur à supprimer
     */
    public async deleteUser(id: string): Promise<void> {
        if (!id) {
            throw new Error('ID utilisateur requis');
        }

        try {
            await this.repository.delete(id);
        } catch (error) {
            console.error(`Service - Error deleting user with ID ${id}:`, error);
            throw new Error(`Échec lors de la suppression de l'utilisateur avec l'ID ${id}`);
        }
    }

    /**
     * Met à jour un utilisateur
     * @param user Utilisateur à mettre à jour
     */
    public async updateUser(user: User): Promise<void> {
        if (!user) {
            throw new Error('Utilisateur requis');
        }

        try {
            await this.repository.update(user);
        } catch (error) {
            console.error(`Service - Error updating user with ID ${user.getId()}:`, error);
            throw new Error(`Échec lors de la mise à jour de l'utilisateur avec l'ID ${user.getId()}`);
        }
    }
}

export default UserService;