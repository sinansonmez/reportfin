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
exports.ReportResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Report_1 = require("../entities/Report");
const Bank_1 = require("../entities/Bank");
const isAuth_1 = require("../middleware/isAuth");
const typeorm_1 = require("typeorm");
const CreateReportInput_1 = require("./inputs/CreateReportInput");
let PaginatedReports = class PaginatedReports {
};
__decorate([
    (0, type_graphql_1.Field)(_returns => [Report_1.Report]),
    __metadata("design:type", Array)
], PaginatedReports.prototype, "reports", void 0);
__decorate([
    (0, type_graphql_1.Field)(_returns => Boolean),
    __metadata("design:type", Boolean)
], PaginatedReports.prototype, "hasMore", void 0);
PaginatedReports = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedReports);
let ReportResolver = class ReportResolver {
    async reports(limit, cursor) {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = limit + 1;
        const replacements = [realLimitPlusOne];
        if (cursor)
            replacements.push(new Date(parseInt(cursor)));
        const reports = await Report_1.Report.find({
            where: cursor ? { createdAt: (0, typeorm_1.LessThan)(replacements[1]) } : {},
            take: replacements[0],
            relations: ["bank"]
        });
        return { reports: reports.slice(0, realLimit), hasMore: reports.length === realLimitPlusOne };
    }
    report(id) {
        return Report_1.Report.findOne(id, { relations: ["bank"] });
    }
    async increaseDownloadCount(id) {
        await Report_1.Report.update({ id }, { downloadCount: () => `"downloadCount" + 1` });
        return true;
    }
    async createReport(options) {
        const bankRecord = await Bank_1.Bank.findOne({ where: { name: options.bank } });
        if (!bankRecord)
            throw new Error("Bank not found");
        if (options.year.length !== 4)
            throw new Error("Invalid year format");
        const report = Report_1.Report.create({
            year: options.year,
            quarter: options.quarter,
            link: options.link,
            bank: bankRecord,
            bankId: bankRecord.id
        });
        await report.save();
        return report;
    }
    async updateReport(id, year, quarter, link) {
        const result = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .update(Report_1.Report)
            .set({ year, quarter, link })
            .where("id = :id", { id })
            .returning("*")
            .execute();
        return result.raw[0];
    }
    async deleteReport(id) {
        const report = await Report_1.Report.findOne(id);
        if (!report)
            throw new Error("Report not found");
        await Report_1.Report.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)((_returns) => PaginatedReports),
    __param(0, (0, type_graphql_1.Arg)("limit", _returns => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("cursor", _returns => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "reports", null);
__decorate([
    (0, type_graphql_1.Query)((_returns) => Report_1.Report, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", _returns => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "report", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", _returns => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "increaseDownloadCount", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Report_1.Report),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReportInput_1.CreateReportInput]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "createReport", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Report_1.Report, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id", _returns => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("year")),
    __param(2, (0, type_graphql_1.Arg)("quarter")),
    __param(3, (0, type_graphql_1.Arg)("link")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "updateReport", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => Boolean, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id", _returns => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "deleteReport", null);
ReportResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReportResolver);
exports.ReportResolver = ReportResolver;
//# sourceMappingURL=report.js.map