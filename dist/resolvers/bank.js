"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Bank_1 = require("../entities/Bank");
const isAuth_1 = require("../middleware/isAuth");
const CreateBankInput_1 = require("./inputs/CreateBankInput");
let BankResolver = class BankResolver {
    banks() {
        return Bank_1.Bank.find();
    }
    bank(id) {
        return Bank_1.Bank.findOne(id);
    }
    async createBank(options) {
        const bank = Bank_1.Bank.create({
            name: options.name,
            continent: options.continent,
            country: options.country,
            logo: options.logo,
            website: options.website
        });
        await bank.save();
        return bank;
    }
    async updateBank(id, logo) {
        const bank = await Bank_1.Bank.findOne(id);
        if (!bank)
            throw new Error("Bank not found");
        if (typeof logo !== "undefined") {
            await Bank_1.Bank.update({ id }, { logo });
        }
        return bank;
    }
    async deleteBank(id) {
        const bank = await Bank_1.Bank.findOne(id);
        if (!bank)
            return false;
        await Bank_1.Bank.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)((_returns) => [Bank_1.Bank]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankResolver.prototype, "banks", null);
__decorate([
    (0, type_graphql_1.Query)((_returns) => Bank_1.Bank, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankResolver.prototype, "bank", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Bank_1.Bank),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBankInput_1.CreateBankInput]),
    __metadata("design:returntype", Promise)
], BankResolver.prototype, "createBank", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Bank_1.Bank, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("logo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BankResolver.prototype, "updateBank", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Boolean, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankResolver.prototype, "deleteBank", null);
BankResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BankResolver);
exports.BankResolver = BankResolver;
//# sourceMappingURL=bank.js.map