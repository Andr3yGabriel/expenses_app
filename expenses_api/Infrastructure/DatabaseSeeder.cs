using expenses_api.Models;

namespace expenses_api.Infrastructure;

public class DatabaseSeeder
{
    public static void Seed(ConnectionContext db)
    {
        SeedCategories(db);
    }

    private static void SeedCategories(ConnectionContext db)
    {
        if (db.Categories.Any()) return;

        var categories = new List<Category>
        {
            new() { Description = "Alimentação",             Finalidade = Finalidade.Despesa  },
            new() { Description = "Moradia",                 Finalidade = Finalidade.Despesa  },
            new() { Description = "Transporte",              Finalidade = Finalidade.Despesa  },
            new() { Description = "Saúde",                   Finalidade = Finalidade.Despesa  },
            new() { Description = "Educação",                Finalidade = Finalidade.Despesa  },
            new() { Description = "Lazer e Entretenimento",  Finalidade = Finalidade.Despesa  },
            new() { Description = "Vestuário",               Finalidade = Finalidade.Despesa  },
            
            new() { Description = "Salário",                    Finalidade = Finalidade.Receita  },
            new() { Description = "Freelance",                  Finalidade = Finalidade.Receita  },
            new() { Description = "Rendimento de Investimentos", Finalidade = Finalidade.Receita },
            new() { Description = "Aluguel Recebido",           Finalidade = Finalidade.Receita  },
            new() { Description = "Décimo Terceiro",            Finalidade = Finalidade.Receita  },
            
            new() { Description = "Transferência entre contas", Finalidade = Finalidade.Ambos },
            new() { Description = "Ajuste de saldo",            Finalidade = Finalidade.Ambos },
        };

        db.Categories.AddRange(categories);
        db.SaveChanges();
    }
}